// Packet Tracer script loader for the OSPF lab.
// Import this file into the .pkt's File Script Module, then "Run File":
// it evaluates automation/task.js from disk so every build/config step is reproducible as code.
// Remove this module before the final save so the finished .pkt has no external paths.
var BASE = "/path/to/ospf-multi-area-lab/";   // set to your local copy of this repository
var SFM = ipc.systemFileManager();
function runFromDisk(rel) { eval(SFM.getFileContents(BASE + rel)); }
try { runFromDisk("automation/task.js"); } catch (e) { try { dprint("RUNNER ERROR " + e); } catch (x) {} try { SFM.writePlainTextToFile(BASE + "automation/logs/runner_error.log", String(e) + "\n"); } catch (y) {} }
