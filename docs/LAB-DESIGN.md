# Lab design

One Cisco Packet Tracer 9.0 lab backs the whole course. Every configuration and `show` output in the video was captured from it (see [`../evidence/`](../evidence/)).
Packet Tracer runs IOS 15.1(4)M4 on the C2900 routers. Features it rejects are taught with Cisco documentation and are labeled "not in Packet Tracer" in the video. The full command probe is in [`../automation/logs/probe_cmds.log`](../automation/logs/probe_cmds.log).

## Devices

| Device | Model | Role | Router ID | Loopback0 |
| --- | --- | --- | --- | --- |
| R1 | 2911 | Backbone router, ASBR (internet edge) | 1.1.1.1 | 10.255.0.1/32 |
| R2 | 2911 | ABR area 0 / area 1, virtual-link endpoint | 2.2.2.2 | 10.255.0.2/32 |
| R3 | 2911 | ABR area 0 / area 2 (stub, then totally stubby) | 3.3.3.3 | 10.255.0.3/32 |
| R4 | 2911 | ABR area 0 / area 3 (NSSA experiments) | 4.4.4.4 | 10.255.0.4/32 |
| R5 | 2911 | Area 1 router; connects area 4 (needs a virtual link) | 5.5.5.5 | 10.255.0.5/32 |
| R6 | 2911 | Area 2 internal router | 6.6.6.6 | 10.255.0.6/32 |
| R7 | 2911 | Area 3 internal router, ASBR (partner static routes) | 7.7.7.7 | 10.255.0.7/32 |
| R8 | 2911 | Area 4 internal router (area not touching area 0) | 8.8.8.8 | 10.255.0.8/32 |
| ISP | 2911 | Not OSPF. Internet stand-in | - | - |
| PARTNER | 2911 | Not OSPF. Partner network reached by static routes | - | - |
| SW-BB | 2960-24TT | Backbone LAN switch (FastEthernet, 100 Mbps) | - | - |
| PC-A | PC | Host in area 1 | - | - |
| PC-B | PC | Host in area 2 | - | - |

Router IDs are set with `router-id`, which shows that a router ID does not have to be an interface address.

## Links and addressing

| Link | Endpoints | Subnet | Area | Network type |
| --- | --- | --- | --- | --- |
| Backbone LAN | R1 Gi0/0 .1, R2 Gi0/0 .2, R3 Gi0/0 .3, R4 Gi0/0 .4 (SW-BB Fa0/1-4) | 10.0.0.0/24 | 0 | broadcast (DR/BDR) |
| R1-R2 direct | R1 Gi0/2 .1, R2 Gi0/2 .2 | 10.0.12.0/30 | 0 | point-to-point |
| R2-R5 | R2 Gi0/1 .1, R5 Gi0/0 .2 | 10.1.25.0/30 | 1 | point-to-point |
| R5 LAN | R5 Gi0/2 .1, PC-A 10.1.10.10 | 10.1.10.0/24 | 1 | passive |
| R5 loopbacks | Lo1, Lo2, Lo3 | 10.1.1.0/24, 10.1.2.0/24, 10.1.3.0/24 | 1 | point-to-point (Lo3 first left at the default) |
| R5-R8 | R5 Gi0/1 .1, R8 Gi0/0 .2 | 10.4.58.0/30 | 4 (1 in the final lab) | point-to-point |
| R8 loopback | Lo1 | 10.4.1.0/24 | 4 (1 in the final lab) | point-to-point |
| R3-R6 | R3 Gi0/1 .1, R6 Gi0/0 .2 | 10.2.36.0/30 | 2 | point-to-point |
| R6 LAN | R6 Gi0/1 .1, PC-B 10.2.10.10 | 10.2.10.0/24 | 2 | passive |
| R4-R7 | R4 Gi0/1 .1, R7 Gi0/0 .2 | 10.3.47.0/30 | 3 | point-to-point |
| R7 loopback | Lo1 | 10.3.1.0/24 | 3 | point-to-point |
| R1-ISP | R1 Gi0/1 .1, ISP Gi0/0 .2 | 198.51.100.0/30 | none | |
| R7-PARTNER | R7 Gi0/1 .1, PARTNER Gi0/0 .2 | 192.168.100.0/30 | none | |
| ISP service network | ISP Lo1 | 203.0.113.0/24 | external | |
| Partner networks | PARTNER Lo1, Lo2 | 172.16.0.0/24, 172.16.1.0/24 | external | |

IPv6 and OSPFv3 run on R1 to R5: backbone LAN 2001:db8::/64, loopbacks 2001:db8:ffff::N/128, R2-R5 2001:db8:1:25::/64, R5 LAN 2001:db8:1:10::/64.

The backbone LAN is FastEthernet on purpose. With the default reference bandwidth (100 Mbps), the 100 Mbps LAN and the 1 Gbps direct link both cost 1, so R1 load-shares to R2 over both. After `auto-cost reference-bandwidth 10000` the LAN costs 100 and the gigabit link costs 10.

## Configuration stages

| Stage | Folder | What it is |
| --- | --- | --- |
| Base | [`configs/base`](../configs/base) | Five areas, all normal. Default priorities and reference bandwidth. No summarization, no authentication, no virtual link, so area 4 is cut off. R1 originates a default route and redistributes 203.0.113.0/24 as E1. R7 redistributes the partner networks as E2. |
| Stage 2 | [`configs/stage2`](../configs/stage2) | A clean rebuild with the earlier steps applied: DR priorities, reference bandwidth 10000, the R2 summary, totally stubby area 2 and the R5 Lo3 fix. The virtual link, authentication, OSPFv3 and troubleshooting captures start from here. |
| Final | [`configs/final`](../configs/final) | The state saved in `OSPF-Multi-Area-Lab.pkt` (below). |

## The final saved lab

- **DR/BDR:** R1 priority 100 (DR), R2 priority 50 (BDR), R3 and R4 priority 0.
- **Cost:** `auto-cost reference-bandwidth 10000` on every router.
- **Area 1:** summarized on R2 as 10.1.0.0/16. MD5 authentication on R2-R5.
- **Area 2:** totally stubby (`area 2 stub no-summary` on R3, `area 2 stub` on R6).
- **Area 3:** normal. Packet Tracer does not generate Type 7 LSAs, so NSSA is taught from Cisco documentation.
- **Area 4:** folded into area 1. With the R2-R5 virtual link up, Packet Tracer starts originating bogus Type 4 LSAs and external routes loop (see [`PACKET-TRACER-NOTES.md`](PACKET-TRACER-NOTES.md)). The virtual-link captures are in `evidence/16_virtual_link`.
- **Passive interfaces:** R5 Gi0/2 and R6 Gi0/1.
- **Externals:** R1 default route plus 203.0.113.0/24 (E1, seed 20). R7 partner networks (E2).

## Not supported by Packet Tracer

These are taught with diagrams and documented Cisco IOS syntax:
NBMA and point-to-multipoint network types, `ip ospf mtu-ignore`, HMAC-SHA key-chain authentication, BFD, SPF and LSA throttle timers, `maximum-paths`, `summary-address` (ASBR summarization), `area filter-list` and `distribute-list`, `area X nssa default-information-originate`, `max-metric router-lsa` and virtual-link options.
