# Evidence

Raw `show` output captured from the lab, one folder per step. Each folder has an `INDEX.txt` with the capture time. Where the step changed the configuration, a `STEP_*.txt` file holds the exact commands and the router's replies.
Files are named `<device>__<command>.txt`.

| Folder | What it shows |
| --- | --- |
| `01_base` | Starting lab: neighbors, interfaces, the full LSDB, routes and OSPFv3 on every router |
| `02_dr_fail` | R4 (the DR) shut down: R3 takes over as DR and R2 becomes BDR |
| `03_dr_return` | R4 returns and stays a DROTHER (non-preemptive election) |
| `04_prio_set` | Priority 100 on R1 and 50 on R2: no change until the next election |
| `05_prio_clear` | All four routers reset: R1 becomes DR; Packet Tracer gives BDR to R4 |
| `05b_prio_zero` | Priority 0 on R3 and R4: R2 becomes BDR, no reset needed |
| `06_cost_default` | Default costs and equal-cost paths over the 100 Mbps LAN and the 1 Gbps link |
| `07_cost_refbw` | `auto-cost reference-bandwidth 10000` |
| `08_cost_manual` | `ip ospf cost 150` on R1 Gi0/2 |
| `09_cost_restore_lo3` | Manual cost removed; `ip ospf network point-to-point` on R5 Lo3 |
| `10_stub_mismatch` | Stub flag on R3 only: the R3-R6 adjacency drops |
| `11_area2_stub` | Area 2 as a stub (contains the Packet Tracer stale-LSA quirk) |
| `11b_area2_stub_clean` | Clean stub area capture |
| `12_area2_totally_stubby` | Totally stubby area 2: R6 holds router LSAs plus one default route |
| `13_area3_nssa` | NSSA accepted but no Type 7 LSAs (Packet Tracer limit) |
| `14_area3_totally_nssa` | Totally NSSA: R7 gets the `O*IA` default route |
| `14b_area3_normal` | Area 3 returned to a normal area |
| `15_summary_r2` | `area 1 range 10.1.0.0 255.255.0.0` on R2 and the Null0 discard route |
| `15b_external_check` | External routes and Type 4 LSAs after the virtual link (Packet Tracer bug) |
| `16_virtual_link` | R2-R5 virtual link FULL; R8 learns the inter-area routes |
| `16_virtual_link_on_polluted_lab` | First virtual-link attempt, before the clean rebuild |
| `17_summary_both` | The same range on R5: R1 sees only the summary |
| `18_auth_one_side` | MD5 on R2 only: the neighbor drops after the dead timer |
| `19_auth_both` | MD5 on both ends: the adjacency returns to FULL |
| `20_ospfv3` | OSPFv3 neighbors, LSDB (Link and Intra-Area-Prefix LSAs), IPv6 routes and pings |
| `21_stage2_fresh` | Clean stage 2 rebuild, before the virtual link |
| `30_drills_a` | Faults injected: hello timers, area ID, MTU, subnet mask |
| `31_drills_a_restored` | Same routers after the fixes |
| `32_drills_b` | Faults injected: passive interface, duplicate router ID, network type |
| `33_drills_b_restored` | Same routers after the fixes |
| `40_end_to_end` | Pings and traceroutes between hosts, areas and the external networks |
| `41_end_to_end_2` | Ping to the partner network with the virtual link up (fails: Packet Tracer bug) |
| `42_partner_check` | Partner network routing check |
| `43_type4_check` | Type 4 LSAs after the clean rebuild with the virtual link |
| `50_final` | Final saved lab: neighbors, LSDB, routes and OSPFv3 on every router |
| `51_final_pings` | Final end-to-end pings from PC-A and PC-B |

In the final pings the first attempt to each new destination loses a few packets while ARP resolves; the repeat pings succeed 4/4.
