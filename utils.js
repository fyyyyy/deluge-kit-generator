var x2js = new X2JS();


function fixm50to50(v) {
    if (v === undefined) return 0;
    if (typeof v !== "string") return v;
    let res = v;
    if (v.startsWith('0x')) {
        let asInt = parseInt(v.substring(2, 10), 16);
        // Convert to signed 32 bit.
        if (asInt & 0x80000000) {
            asInt -= 0x100000000;
        }
        // mod matrix weights range from 0xC0000000 to 0x3FFFFFF, and we want to show it
        // as -50 to 50
        res = Math.round(((asInt + 0x80000000) * 200) / 0x100000000) - 100;
    }
    if (v.length > 10) {
        res += '…';
    }
    return res;
}

function convertHexTo50(str) {
    let v = parseInt(str, 16);
    if (v & 0x80000000) {
        v -= 0x100000000;
    }
    let vr = Math.round(((v + 0x80000000) * 50) / 0x100000000);
    return vr;
}

var hexMap = {
    0: '0x80000000',
    1: '0x851EB851',
    2: '0x8A3D70A2',
    3: '0x8F5C28F3',
    4: '0x947AE144',
    5: '0x99999995',
    6: '0x9EB851E6',
    7: '0xA3D70A37',
    8: '0xA8F5C288',
    9: '0xAE147AD9',
    10: '0xB333332A',
    11: '0xB851EB7B',
    12: '0xBD70A3CC',
    13: '0xC28F5C1D',
    14: '0xC7AE146E',
    15: '0xCCCCCCBF',
    16: '0xD1EB8510',
    17: '0xD70A3D61',
    18: '0xDC28F5B2',
    19: '0xE147AE03',
    20: '0xE6666654',
    21: '0xEB851EA5',
    22: '0xF0A3D6F6',
    23: '0xF5C28F47',
    24: '0xFAE14798',
    25: '0x00000000',
    26: '0x051EB83A',
    27: '0x0A3D708B',
    28: '0x0F5C28DC',
    29: '0x147AE12D',
    30: '0x1999997E',
    31: '0x1EB851CF',
    32: '0x23D70A20',
    33: '0x28F5C271',
    34: '0x2E147AC2',
    35: '0x33333313',
    36: '0x3851EB64',
    37: '0x3D70A3B5',
    38: '0x428F5C06',
    39: '0x47AE1457',
    40: '0x4CCCCCA8',
    41: '0x51EB84F9',
    42: '0x570A3D4A',
    43: '0x5C28F59B',
    44: '0x6147ADEC',
    45: '0x6666663D',
    46: '0x6B851E8E',
    47: '0x70A3D6DF',
    48: '0x75C28F30',
    49: '0x7AE14781',
    50: '0x7FFFFFD2'
}


function toHex(val) {
    return _.invert(hexMap)[val];
}

mapValuesDeep = function mapValuesDeep(v, callback) {
    return _.isObject(v) ?
        _.mapValues(v, function (x) {
            return mapValuesDeep(x, callback);
        }) :
        callback(v);
}

function generateHexMap(params) {
    var k = {};
    var last = 0;
    for (i = 0x00000000; i <= 0xFFFFFFFF; i += 0x00FFFF) {
        h = '0x' + i.toString(16);
        if (Math.floor(fixm50to50(h)) !== last) {
            k[fixm50to50(h)] = h;
            var last = Math.floor(fixm50to50(h));
        }
    }
    console.log(k);
}

function stripFolder(path) {
    return path && _.last(path.split('/'))
}

function parseNumber(value) {
    // dont parse hex numbers
    if (value.startsWith('0x')) return value;
    return isNaN(parseInt(value)) ? value : parseInt(value);
}

function allNotes() {
    var noteMap = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    var octaves = _.range(-1, 9);
    var allNotes = {}
    _.each(octaves, function (octave, x) {
        _.each(noteMap, function (note, i) {
            allNotes[i + x * 12] = note + (octave);
        });
    });
    return allNotes;
}


function extractFolderName(path) {
    var folderName = _.split(path, '/');
    folderName.pop();
    folderName = folderName.join('/');
    return folderName;
}

function toJson(xml) {
    // cannot parse xml version statement :p
    xml = xml.replace(/<\?xml .*\?>/, '');

    // one root tag allowed, use wrapper
    var json = x2js.xml_str2json('<wrap>' + xml + '</wrap>').wrap;

    return json;
}


function toXml(json) {
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + json2xml(json, "\t");
}


function createDownload(data, filename) {
    var blob = new Blob([data], {
        type: 'text/xml'
    });

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        var e = document.createEvent('MouseEvents'),
            a = document.createElement('a');
        a.download = filename;
        a.href = window.URL.createObjectURL(blob);
        a.dataset.downloadurl = ['text/xml', a.download, a.href].join(':');
        e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
        window.URL.revokeObjectURL(a.href); // clean the url.createObjectURL resource
    }
}


function trackKind(track) {
    if(!track) return '';
	if(track['kit']) return 'KIT';
	if(track['sound']) return 'SYNTH';
	if(track['midiChannel']) return 'MIDI';
	if(track['cvChannel']) return 'CV';
	// deal with indirect refs
	if(track['kitParams']) return 'KIT';
	if(track['soundParams']) return 'SYNTH';
	return 'unknown';
}

UTILS = {
    stripFolder: stripFolder,
    extractFolderName: extractFolderName,
    fixm50to50: fixm50to50,
    convertHexTo50: convertHexTo50,
    toHex: toHex,
    toXml: toXml,
    toJson: toJson,
    parseNumber: parseNumber,
    allNotes: allNotes,
    trackKind: trackKind,
    mapValuesDeep: mapValuesDeep,
    createDownload: createDownload
};