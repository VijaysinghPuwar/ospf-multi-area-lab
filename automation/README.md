# Automation: Packet Tracer scripts

These scripts built, configured and captured the lab through Packet Tracer 9.0's JavaScript scripting engine (Extensions → Scripting). They are kept as a record of how every configuration change and every piece of evidence was produced. None of them run from `OSPF-Multi-Area-Lab.pkt`.

## How it works

A Packet Tracer script module loads [`runner.js`](runner.js), which reads and runs [`task.js`](task.js) from disk. Each step rewrites `task.js` to run one file from [`tasks/`](tasks/), then **Run File** is pressed. Every step writes a log to [`logs/`](logs/), and every capture writes to [`../evidence/`](../evidence/).

Before reusing the scripts, set `BASE` in `lib.js` and `runner.js` to your local copy of this repository.

## Scripts

| Script | Purpose |
| --- | --- |
| `lib.js`, `cli.js` | Shared helpers: workspace handles, file I/O, console access, `enable`, paging through `--More--`, output capture |
| `build_topology.js` | Creates all 13 devices and 13 cables with exact interfaces (re-runnable) |
| `apply_configs.js` | Pushes `configs/<set>/<device>.cfg` line by line and logs any rejected command |
| `step.js` | Applies one scenario change and records the commands and replies in `STEP_*.txt` |
| `capture.js`, `caps.js` | Runs `show` commands and saves each output to `evidence/<step>/` |
| `probe_cmds.js` | Tests which OSPF commands Packet Tracer accepts, on a temporary router |
| `layout.js`, `layout_spec.js` | Device positions, area boxes and canvas notes |
| `tasks/` | One file per lab step (`t02` to `t54`), troubleshooting drills (`tD*`) and ping tests (`tP*`) |
