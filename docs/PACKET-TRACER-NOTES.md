# Packet Tracer notes

Packet Tracer 9.0 behavior seen in this lab that differs from real Cisco IOS. None of it is presented as real IOS behavior in the course. The folder in brackets holds the evidence.

## Output quirks

- `show ip route <prefix>` labels inter-area (O IA) routes as "type intra area" (10.1.10.0/24 on R1, `06_cost_default`). The route codes in `show ip route ospf` are correct.
- `show ip ospf interface brief` shows "Nbrs F/C 0/0" even with FULL neighbors, and Loopback0 in state "WAIT" (`01_base`).
- `show interfaces GigabitEthernet0/2` on R1 shows "BW 1000000 Kbit" but the text "Full-duplex, 100Mb/s" (`07_cost_refbw`). The OSPF cost follows BW (cost 10 with reference 10000).
- `show ip ospf border-routers` on R1 labels every ABR (2.2.2.2, 3.3.3.3, 4.4.4.4) as "ABR/ASBR" and does not list ASBR 7.7.7.7 (`01_base`).
- `show ip ospf database` sometimes prints the "Type-5 AS External Link States" header twice (`21_stage2_fresh`).
- Packet Tracer 9 adds a "Power Distribution Device" to the workspace. It is not a network node (`21_stage2_fresh/INVENTORY.txt`).

## Commands that are rejected or behave differently

- `ip ospf network broadcast`, `non-broadcast` and `point-to-multipoint` are rejected. `point-to-point` is accepted ([probe log](../automation/logs/probe_cmds.log)).
- `no area 2 stub no-summary` on R3 removed the whole stub setting, not just `no-summary` (`11b_area2_stub_clean`).
- `ip ospf hello-interval 5` left the dead interval at 40. Real IOS sets dead to 4 × hello (20 s) unless dead is configured (`30_drills_a`).
- MTU mismatch is not enforced. With `ip mtu 1400` on R2 Gi0/2, R1-R2 still reached FULL (`30_drills_a`). Real IOS gets stuck in EXSTART/EXCHANGE.
- No "mismatch area ID", hello-parameter or authentication mismatch log lines are printed. The neighbor tables and "Dead timer expired" are the evidence.

## Behavior differences

- **DR/BDR timing:** after a near-simultaneous `clear ip ospf process` on all four backbone routers, R4 (priority 1) became BDR over R2 (priority 50) (`05_prio_clear`). Setting priority 0 on R3 and R4 fixed it without a reset (`05b_prio_zero`).
- **Stub conversion:** after making area 2 a stub on a running lab, R6 kept stale Type 5 LSAs and R3 kept sending a Type 4 into the stub area (`11_area2_stub`). Real IOS flushes them. The clean captures are `11b_area2_stub_clean` and `12_area2_totally_stubby`, taken after `clear ip ospf process`.
- **NSSA:** `area 3 nssa` is accepted, but no Type 7 LSAs are ever created and `show ip ospf database nssa-external` is rejected (`13_area3_nssa`). The totally NSSA default route does work (`14_area3_totally_nssa`). Area 3 is a normal area in the final lab.
- **Virtual link:** as soon as the R2-R5 virtual link comes up, the ABRs (and even R8) start originating bogus Type 4 LSAs, including Type 4s for 1.1.1.1 inside area 0, and external routes to 172.16.0.0/23 loop (`15b_external_check`, `43_type4_check`). The virtual link itself works: it reaches FULL and R8 learns the inter-area routes (`16_virtual_link`). The final lab folds area 4 into area 1 instead of keeping the virtual link.
- **Authentication and the virtual link:** with MD5 on R2 Gi0/1 only, the R2-R5 adjacency dropped, but the virtual link over the same path stayed FULL (`18_auth_one_side`).
- **Network-type mismatch:** with R1 Gi0/2 broadcast and R2 Gi0/2 point-to-point, R1 saw R2 as 2WAY/DROTHER and R2 stayed in EXSTART (`32_drills_b`).
