//Version 2017-4-12
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
    var s3 = '.'+s2;
    var hit = s1.indexOf(s3, s1.length - s3.length) !== -1
    if(hit === true){
        return true;
    }
    if(s1 === s2){
        return true;
    }
    return false; 
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
    var P = 'HTTPS hsline-1.vnet.one:443;HTTPS hsline-1.vnet.one:465;HTTPS hsline-1.vnet.one:311;HTTPS hsline-1.vnet.one:321;HTTPS hsline-1.vnet.one:331;PROXY hsline-1.vnet.one:80;PROXY hsline-1.vnet.one:310;PROXY hsline-1.vnet.one:143;PROXY hsline-1.vnet.one:320;PROXY hsline-1.vnet.one:330;PROXY hsline-1.vnet.one:2048;';
    
    //Check-Tunnel
    if(host==='check.vnet.one'){
        return P;
    }
    
    //Preload-DirectGo
    if(suffix(host,'vnet.link')||suffix(host,'vnet.one')){
        return D;
    }
    
        
        
        
        
        
        
    //Default
    return P;}
