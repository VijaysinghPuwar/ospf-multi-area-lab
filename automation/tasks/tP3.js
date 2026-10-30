eval(SFM.getFileContents(BASE + "automation/lib.js"));
eval(SFM.getFileContents(BASE + "automation/cli.js"));
getCL(dev("PC-A")).enterCommand("ping 172.16.0.1");
getCL(dev("PC-B")).enterCommand("ping 203.0.113.1");
getCL(dev("PC-B")).enterCommand("tracert 172.16.1.1");
