// Push configs/<SET>/<DEVICE>.cfg line by line into each device CLI and log every rejected command.
eval(SFM.getFileContents(BASE + "automation/lib.js"));
eval(SFM.getFileContents(BASE + "automation/cli.js"));
var SET = (typeof CFG_SET !== "undefined") ? CFG_SET : "base";
var ORDER = ["SW-BB", "ISP", "PARTNER", "R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8"];
var TARGETS = (typeof APPLY_ONLY !== "undefined" && APPLY_ONLY) ? APPLY_ONLY : ORDER;
var summary = [];
for (var i = 0; i < TARGETS.length; i++) {
  var name = TARGETS[i], d = dev(name);
  if (!d) { log("MISSING " + name); continue; }
  try { d.skipBoot(); } catch (e) {}
  var cl = getCL(d);
  if (!cl) { log("NO TERMINAL " + name); continue; }
  // get to a plain prompt (answers the initial configuration dialog)
  for (var k = 0; k < 6; k++) {
    var pr = String(cl.getPrompt());
    if (pr.indexOf("initial configuration dialog") >= 0) { rawSend(d, "no"); rawSend(d, ""); continue; }
    if (pr.replace(/\s+/g, "") === "") { rawSend(d, ""); continue; }
    break;
  }
  var lines = String(readFile("configs/" + SET + "/" + name + ".cfg")).split(/\r?\n/);
  var sent = 0, errs = 0, tr = [];
  for (var j = 0; j < lines.length; j++) {
    var line = lines[j];
    if (!line.replace(/\s+/g, "")) continue;
    var out = run(d, line.replace(/^\s+/, ""));
    sent++;
    var p2 = String(cl.getPrompt());
    if (p2.indexOf("[confirm]") >= 0 || p2.indexOf("[yes/no]") >= 0 || /\[no\]:\s*$/.test(p2)) { rawSend(d, p2.indexOf("[yes/no]") >= 0 ? "no" : (/\[no\]/.test(p2) ? "yes" : "")); }
    tr.push(p2 + " | " + line + (out.replace(/\s+/g, "") ? "\n    " + out.replace(/\n/g, "\n    ") : ""));
    if (/% ?Invalid|% ?Incomplete|% ?Ambiguous|% ?Unrecognized|not supported|% ?Unknown|% ?IPv6 routing not enabled|% ?Bad mask|overlaps/i.test(out)) {
      errs++; log("  " + name + " REJECTED line " + (j + 1) + ": " + line + "  =>  " + out.replace(/\s+/g, " ").substring(0, 200));
    }
  }
  writeFile("automation/logs/transcript_" + SET + "_" + name + ".txt", tr.join("\n") + "\n");
  summary.push(name + ": sent " + sent + ", rejected " + errs + ", prompt '" + cl.getPrompt() + "'");
}
log("SUMMARY (" + SET + ")\n" + summary.join("\n"));
flushLog("automation/logs/apply_" + SET + ".log");
