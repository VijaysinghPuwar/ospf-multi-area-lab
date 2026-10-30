// Probe: which OSPF commands does Packet Tracer's 2911 IOS accept? Adds a temporary router PROBE, then removes it.
eval(SFM.getFileContents(BASE + "automation/lib.js"));
eval(SFM.getFileContents(BASE + "automation/cli.js"));
var name = LW.addDevice(0, "2911", 100, 100);
var d = dev(name); d.setName("PROBE");
try { d.skipBoot(); } catch (e) {}
ensurePriv(d);
log("version: " + run(d, "show version | include IOS").replace(/\s+/g, " ").substring(0, 200));
var CMDS = [
 "configure terminal",
 "interface GigabitEthernet0/0", "ip address 10.9.9.1 255.255.255.0", "no shutdown",
 "ip ospf priority 100", "ip ospf network point-to-point", "ip ospf network broadcast", "ip ospf network non-broadcast", "ip ospf network point-to-multipoint", "ip ospf network broadcast",
 "ip ospf hello-interval 5", "ip ospf dead-interval 20", "ip ospf dead-interval minimal hello-multiplier 4", "no ip ospf dead-interval", "no ip ospf hello-interval",
 "ip ospf cost 50", "no ip ospf cost",
 "ip ospf authentication message-digest", "ip ospf message-digest-key 1 md5 TestKey1", "ip ospf authentication", "ip ospf authentication-key Plain1", "ip ospf authentication null", "no ip ospf authentication",
 "ip ospf authentication key-chain KC1",
 "ip mtu 1400", "no ip mtu", "ip ospf mtu-ignore", "no ip ospf mtu-ignore",
 "ip ospf 1 area 0", "no ip ospf 1 area 0",
 "bfd interval 50 min_rx 50 multiplier 3", "ip ospf bfd",
 "ipv6 address 2001:db8:9::1/64", "ipv6 ospf 1 area 0", "ipv6 ospf priority 5", "ipv6 ospf cost 7",
 "exit",
 "key chain KC1", "key 1", "key-string Abc", "cryptographic-algorithm hmac-sha-256", "exit", "exit",
 "ipv6 unicast-routing",
 "ipv6 router ospf 1", "router-id 9.9.9.9", "area 1 stub", "exit",
 "router ospf 1",
 "router-id 9.9.9.9", "log-adjacency-changes", "log-adjacency-changes detail",
 "auto-cost reference-bandwidth 10000", "maximum-paths 8", "passive-interface default", "no passive-interface default", "passive-interface GigabitEthernet0/1",
 "network 10.9.9.0 0.0.0.255 area 0",
 "area 1 stub", "area 1 stub no-summary", "no area 1 stub", "area 2 nssa", "area 2 nssa no-summary", "area 2 nssa default-information-originate", "no area 2 nssa",
 "area 3 range 10.3.0.0 255.255.0.0", "area 3 range 10.4.0.0 255.255.0.0 not-advertise", "area 3 range 10.5.0.0 255.255.0.0 cost 50",
 "area 4 virtual-link 4.4.4.4", "area 4 virtual-link 4.4.4.4 hello-interval 5", "area 4 virtual-link 4.4.4.4 authentication message-digest", "area 4 virtual-link 4.4.4.4 message-digest-key 1 md5 VLkey",
 "area 0 authentication message-digest", "no area 0 authentication",
 "area 5 default-cost 20",
 "summary-address 172.16.0.0 255.255.254.0", "summary-address 172.17.0.0 255.255.0.0 not-advertise",
 "redistribute static subnets", "redistribute static subnets metric-type 1", "redistribute static metric 50 metric-type 1 subnets", "redistribute connected subnets", "redistribute rip subnets",
 "default-information originate", "default-information originate always metric 10 metric-type 1",
 "distance 115", "distance ospf external 150", "no distance ospf external 150", "no distance 115",
 "area 1 filter-list prefix PL1 in", "distribute-list prefix PL1 in", "distribute-list 10 in", "no distribute-list 10 in",
 "timers throttle spf 10 100 5000", "timers throttle lsa 10 100 5000", "timers lsa arrival 50", "timers spf 5 10",
 "compatible rfc1583", "no compatible rfc1583",
 "bfd all-interfaces",
 "max-metric router-lsa", "no max-metric router-lsa",
 "end",
 "show ip ospf", "show ip ospf interface brief", "show ip ospf interface GigabitEthernet0/0", "show ip ospf neighbor", "show ip ospf neighbor detail", "show ip ospf database", "show ip ospf database router", "show ip ospf database network", "show ip ospf database summary", "show ip ospf database asbr-summary", "show ip ospf database external", "show ip ospf database nssa-external", "show ip ospf database self-originate", "show ip ospf border-routers", "show ip ospf virtual-links", "show ip ospf summary-address", "show ip protocols", "show ip route ospf", "show ipv6 ospf", "show ipv6 ospf neighbor", "show ipv6 ospf database", "show ipv6 route ospf", "show ipv6 ospf interface brief", "show ip ospf statistics", "show ip ospf events", "show ip ospf traffic",
 "debug ip ospf adj", "debug ip ospf hello", "debug ip ospf events", "debug ip ospf packet", "undebug all",
 "clear ip ospf process"
];
var rejected = [], accepted = [];
for (var i = 0; i < CMDS.length; i++) {
  var out = run(d, CMDS[i]);
  var pr = String(prompt(d));
  if (pr.indexOf("[yes/no]") >= 0 || pr.indexOf("[confirm]") >= 0 || /\[no\]/.test(pr)) { rawSend(d, "yes"); out += " <answered yes>"; }
  var flat = out.replace(/\s+/g, " ").trim();
  var bad = /% ?Invalid|% ?Incomplete|% ?Ambiguous|% ?Unrecognized|not supported|% ?Unknown/i.test(out);
  (bad ? rejected : accepted).push(CMDS[i]);
  log((bad ? "REJECT  " : "ok      ") + CMDS[i] + (bad || /^show|^debug|^clear/.test(CMDS[i]) ? "  =>  " + flat.substring(0, bad ? 160 : 400) : (flat ? "  =>  " + flat.substring(0, 160) : "")));
}
log("\nACCEPTED " + accepted.length + "\nREJECTED " + rejected.length + ":\n  " + rejected.join("\n  "));
log("\nrunning-config ospf section:\n" + run(d, "show running-config | section ospf"));
LW.removeDevice("PROBE");
log("probe router removed; devices now " + NET.getDeviceCount());
flushLog("automation/logs/probe_cmds.log");
