//Version 2016-09-07
function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;
    var base64DecodeChars = new Array(
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
        52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
        -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
        15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
        -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        do {
            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c1 == -1);
        if (c1 == -1)
            break;

        do {
            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
        } while (i < len && c2 == -1);
        if (c2 == -1)
            break;

        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64DecodeChars[c3];
        } while (i < len && c3 == -1);
        if (c3 == -1)
            break;

        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64DecodeChars[c4];
        } while (i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}

function suffix(s1, s2) {
    return s1.indexOf(s2, s1.length - s2.length) !== -1;
}

function isHTTPS(s1) {
    return s1.indexOf('https://', 0) !== -1;
}


function check_ipv4(host) {
    var re_ipv4 = /^\d+\.\d+\.\d+\.\d+$/g;
    if (re_ipv4.test(host)) {
        return true;
    }else{
        return false;
    }
}

function loopc(List, host, Rex) {
    for (var i in List) {
        if (suffix(host,List[i])) {
            return Rex;
        }
    }
    return false;
}

function loopn(List, ip, Rex) {
    for (var i in List) {
        if (isInNet(ip, List[i][0], List[i][1])) {
            return Rex;
        }
    }
    return false;
}

function FindProxyForURL(url, host){
        var L_LAN = [['10.0.0.0', '255.0.0.0'], ['172.16.0.0', '255.240.0.0'], ['192.168.0.0', '255.255.0.0']];

    var D = 'DIRECT';
    //ServerList
    if(isHTTPS(url)===false){
        var P = 'HTTPS node-au.vnet.one:443;HTTPS node-au.vnet.one:465;HTTPS node-au.vnet.one:311;HTTPS node-au.vnet.one:321;HTTPS node-au.vnet.one:331;PROXY node-au.vnet.one:80;PROXY node-au.vnet.one:310;PROXY node-au.vnet.one:143;PROXY node-au.vnet.one:320;PROXY node-au.vnet.one:330;';
    }else{
        var P = 'PROXY node-au.vnet.one:80;PROXY node-au.vnet.one:310;PROXY node-au.vnet.one:143;PROXY node-au.vnet.one:320;PROXY node-au.vnet.one:330;HTTPS node-au.vnet.one:443;HTTPS node-au.vnet.one:465;HTTPS node-au.vnet.one:311;HTTPS node-au.vnet.one:321;HTTPS node-au.vnet.one:331;';
    }
    
    //Check-Tunnel
    if(host==='check.vnet.one'){
        return P;
    }
    
        
    //Preload-Out
    var L_service_out = eval(base64decode('WyIueW91a3UuY29tIiwgIi50dWRvdS5jb20iLCAiLnNjb3JlY2FyZHJlc2VhcmNoLmNvbSAiLCAiYWRtYXN0ZXIuY29tLmNuIiwgImlyczAxLmNvbSIsICJhbGltYW1hLmNuIiwgInRhbnguY29tIiwgInphbXBkc3AuY29tIiwgIm1tc3RhdC5jb20iLCAiYWxpY2RuLmNvbSIsICJtaWFvemhlbi5jb20iLCAieWtpbWcuY29tIiwgImd0YWdzLm5ldCIsICJjci1uaWVsc2VuLmNvbSIsICJ0ZGltZy5jb20iLCAiLnRhb2Jhb2Nkbi5jb20iLCAiLm1lZGlhdi5jb20iLCAiLnFpeWkuY29tIiwgIi5wMHkuY24iLCAicWxvZ28uY24iLCAic2luYWltZy5jbiIsICJpcGlueW91LmNvbSIsICJndGltZy5jbiIsICIzNjBidXlpbWcuY29tIiwgInRlbmNlbnRtaW5kLmNvbSIsICJndGltZy5jb20iLCAiMy5jbiIsICJzb2h1LmNvbSIsICJpcnMwMS5uZXQiLCAiaXRjLmNuIiwgIndyYXRpbmcuY29tIiwgInNvZ291LmNvbSIsICIub3B0YWltLmNvbSIsICJiYWlkdXN0YXRpYy5jb20iLCAiYmFpZHUuY29tIiwgIi5wYWlwYWlpbWcuY29tIiwgIm1tY2RuLmNuIiwgIm1sdDAxLmNvbSIsICJhY3M4Ni5jb20iLCAieHVubGVpLmNvbSIsICJrYW5rYW4uY29tIiwgInNhbmRhaS5uZXQiLCAia2FuaW1nLmNvbSIsICJyZXZzY2kubmV0IiwgInNjb3JlY2FyZHJlc2VhcmNoLmNvbSIsICJiaWxpYmlsaS5jb20iLCJiaWxpYmlsaS50diIsICJhY2d2aWRlby5jb20iLCAiLmhkc2xiLmNvbSIsICIuZnVuc2hpb24uY29tIiwgIi5mdW5zaGlvbi5uZXQiLCAiLmJhaWR1c3RhaWMuY29tIiwgImRvdWJsZWNsaWNrLm5ldCIsICJ6aGl6aXl1bi5jb20iLCAiNnJvb21zLmNvbSIsICI2LmNuIiwgImxldHYuY29tIiwgImxldHZjZG4uY29tIiwgImFkbWFzdGVyLmNvbSIsICJsZXR2LmNuIiwgIm1tMTExLm5ldCIsICJhY2Z1bi50diIsICJsZXR2Y2xvdWQuY29tIiwiLmxlLmNvbSIgLCJpc3RyZWFtc2NoZS5jb20iLCJ0b3Vkb3V1aS5jb20iLCIuMTYzLmNvbSIsIi4xMjYubmV0IiwiLjEyNy5uZXQiLCIucXEuY29tIiwiLmNuIiwidG91ZG91LmNvbSIsImlwLmNuIiwiaXAxMzguY29tIiwiaXFpeWkuY29tIiwiNzEuYW0iLCJxaXlpcGljLmNvbSIsInBwcy50diIsInBwdHYuY29tIiwicHBsaXZlLmNuIiwicHBsaXZlLmNvbSIsImcxZC5uZXQiLCJzeW5hY2FzdC5jb20iLCIuamQuY29tIiwidmFtYWtlci5jb20iLCJhZG1hc3Rlci5jb20uY24iLCJsZXR2aW1nLmNvbSIsImxlY2xvdWQuY29tIiwiLmNsb3VkY2RuLm5ldCIsIi53c2NkbnMuY29tIiwiLndlYnRlcnJlbi5jb20iLCIuZmFuY3lhcGkuY29tIiwiLm1vb2tpZTEuY29tIiwiLndyYXRpbmcuY29tIiwiLmZhc3RhcGkubmV0IiwiLmxwaGJzLmNvbSIsIi5jb252aXZhLmNvbSIsIi5jY3R2cGljLmNvbSIsIi5nb29nbGVzeW5kaWNhdGlvbi5jb20iLCIuZ29vZ2xlYWRzZXJ2aWNlcy5jb20iLCIucWhpbWcuY29tIiwiLmdyaWRzdW1kaXNzZWN0b3IuY29tIiwiLmdvb2dsZXRhZ3NlcnZpY2VzLmNvbSIsImRvdWJhbi5mbSIsImRvdWJhbmlvLmNvbSIsImRvdWJhbi5jb20iLCJ2aXN1YWx3ZWJzaXRlb3B0aW1pemVyLmNvbSIsIi5uZXRlYXNlLmNvbSJd'));
    var L2x_out = loopc(L_service_out,host,P);
    if(L2x_out!==false){return L2x_out;}   
    
        
    //Preload-DirectGo
    if(suffix(host,'vnet.link')||suffix(host,'vnet.one')){
        return D;
    }
        
        
        
    //Default
    return P;}
