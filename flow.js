[
    {
        "id": "35cb3948.800046",
        "type": "mqtt in",
        "z": "3dd35245.e5712e",
        "name": "",
        "topic": "kolam1/sensor",
        "qos": "2",
        "broker": "c34ed4ee.2fd1c8",
        "x": 280,
        "y": 500,
        "wires": [
            [
                "75376346.1b100c"
            ]
        ]
    },
    {
        "id": "8f49f6a4.8a13a8",
        "type": "debug",
        "z": "3dd35245.e5712e",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 870,
        "y": 440,
        "wires": []
    },
    {
        "id": "75376346.1b100c",
        "type": "switch",
        "z": "3dd35245.e5712e",
        "name": "",
        "property": "payload",
        "propertyType": "msg",
        "rules": [
            {
                "t": "cont",
                "v": "PH:",
                "vt": "str"
            },
            {
                "t": "cont",
                "v": "TURBID:",
                "vt": "str"
            },
            {
                "t": "cont",
                "v": "TDS:",
                "vt": "str"
            },
            {
                "t": "cont",
                "v": "TEMP:",
                "vt": "str"
            }
        ],
        "checkall": "true",
        "repair": false,
        "outputs": 4,
        "x": 440,
        "y": 500,
        "wires": [
            [
                "77a186c1.1725f8"
            ],
            [
                "cf68c736.8f5508"
            ],
            [
                "4eec5805.027ed8"
            ],
            [
                "c0977621.437308"
            ]
        ]
    },
    {
        "id": "cf68c736.8f5508",
        "type": "function",
        "z": "3dd35245.e5712e",
        "name": "explode TURBID",
        "func": "var a = msg.payload;\nvar b = a.split(\":\");\nvar c = b[1];\nmsg.payload = c;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 690,
        "y": 480,
        "wires": [
            [
                "49de892c.3b9878"
            ]
        ]
    },
    {
        "id": "77a186c1.1725f8",
        "type": "function",
        "z": "3dd35245.e5712e",
        "name": "explode PH",
        "func": "var a = msg.payload;\nvar b = a.split(\":\");\nvar c = b[1];\nmsg.payload = c;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 670,
        "y": 440,
        "wires": [
            [
                "8f49f6a4.8a13a8"
            ]
        ]
    },
    {
        "id": "4eec5805.027ed8",
        "type": "function",
        "z": "3dd35245.e5712e",
        "name": "explode TDS",
        "func": "var a = msg.payload;\nvar b = a.split(\":\");\nvar c = b[1];\nmsg.payload = c;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 670,
        "y": 520,
        "wires": [
            [
                "266b96e7.55d44a"
            ]
        ]
    },
    {
        "id": "c0977621.437308",
        "type": "function",
        "z": "3dd35245.e5712e",
        "name": "explode TEMP",
        "func": "var a = msg.payload;\nvar b = a.split(\":\");\nvar c = b[1];\nmsg.payload = c;\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 680,
        "y": 560,
        "wires": [
            [
                "eb253909.34fce8"
            ]
        ]
    },
    {
        "id": "49de892c.3b9878",
        "type": "debug",
        "z": "3dd35245.e5712e",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 870,
        "y": 480,
        "wires": []
    },
    {
        "id": "266b96e7.55d44a",
        "type": "debug",
        "z": "3dd35245.e5712e",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 870,
        "y": 520,
        "wires": []
    },
    {
        "id": "eb253909.34fce8",
        "type": "debug",
        "z": "3dd35245.e5712e",
        "name": "",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "x": 870,
        "y": 560,
        "wires": []
    },
    {
        "id": "c34ed4ee.2fd1c8",
        "type": "mqtt-broker",
        "z": "",
        "name": "localhost",
        "broker": "localhost",
        "port": "1883",
        "clientid": "",
        "usetls": false,
        "compatmode": true,
        "keepalive": "60",
        "cleansession": true,
        "birthTopic": "",
        "birthQos": "0",
        "birthPayload": "",
        "closeTopic": "",
        "closeQos": "0",
        "closePayload": "",
        "willTopic": "",
        "willQos": "0",
        "willPayload": ""
    }
]
