
async function createWidget() {
    let widget = new ListWidget();

    widget.backgroundColor = new Color("#1E1E1E");

    let header = widget.addText("➜  System Status");
    header.textColor = new Color("#00Ff00");
    header.font = Font.mediumSystemFont(14);

    widget.addSpacer(5);

    let lineBreak = widget.addText("----------------------------");
    lineBreak.textColor = new Color("#FFFFFF"); // white

    widget.addSpacer(5);

    // device name 
    let deviceName = Device.name();
    let deviceNameText = widget.addText(`📱 Device Name: ${deviceName}`);
    deviceNameText.textColor = new Color("#FAF531"); // yellow 
    deviceNameText.font = Font.regularSystemFont(12);
    
    widget.addSpacer(5);
    
    // device OS 
    let deviceOS = Device.systemName();
    let deviceVersion = Device.systemVersion();
    let deviceOSText = widget.addText(`⚙️ Operating System: ${deviceOS} ${deviceVersion}`);
    deviceOSText.textColor = new Color("#fa31e7"); // magenta
    deviceOSText.font = Font.regularSystemFont(12);
    
    widget.addSpacer(5);
    
    // battery level 
    let batteryLevel = Math.floor(Device.batteryLevel() * 100);
    let batteryText = widget.addText(`🔋 Battery: ${batteryLevel}%`);
    batteryText.textColor = new Color("#3174fa");
    batteryText.font = Font.regularSystemFont(12);
    
    widget.addSpacer(5);
    
    // device ip
    let ip = await getIPAddress();
    let ipText = widget.addText(`🌐 IP: ${ip}`)
    ipText.textColor = new Color("#9f31fa"); // purple 
    ipText.font = Font.regularSystemFont(12);

    widget.addSpacer(5);

    // time & date 
    let dateText = widget.addText(`🕒 Time: ${new Date().toLocaleTimeString()}`);
    dateText.textColor = new Color("#31fadd"); // cyan
    dateText.font = Font.mediumSystemFont(12);

    return widget;
}

let widget = await createWidget();

async function getIPAddress() {
    let req = new Request("https://api64.ipify.org?format=json");
    let res = await req.loadJSON();
    return res.ip;
}

(async () => {
    let widget = await createWidget();
    if (config.runsInWidget) {
        Script.setWidget(widget);
    } else {
        await widget.presentMedium();
    }
    Script.complete();
})();

