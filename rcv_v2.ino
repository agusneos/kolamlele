#include <ESP8266WiFi.h>
#include <PubSubClient.h>

#include <ESP8266mDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>

const char* ssid         = "namassid";      // Sesuaikan dengan SSID AP
const char* password     = "passwordssid"; // Sesuaikan dengan password SSID AP
const char* mqttServer   = "192.168.x.x";  // Server Mqtt
const int   mqttPort     = 1883;        // Port Mqtt
const char* mqttUser     = "";          // Username Mqtt
const char* mqttPassword = "";          // Password Mqtt

///DEFINE
#define KOLAM "kolam1/sensor"

// Variables will change:
String dataIn = "";
char dataIn2[50];
char inChar;
boolean parsing = false;

/////
WiFiClient espClient;
PubSubClient client(espClient);

void initWifiStation() {
    Serial.println();
    delay(10);
    WiFi.begin(ssid, password);
    WiFi.mode(WIFI_STA);
    while (WiFi.status() != WL_CONNECTED) {
       delay(500);
       Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}
 
void reconnect() {
    while (!client.connected()) {
        Serial.print("Attempting MQTT connection...");
        String EspId  = "ESP8266Client-";
        EspId += String(random(0xffff), HEX);
        if (client.connect(EspId.c_str(), mqttUser, mqttPassword)) {
            Serial.println("connected");
            digitalWrite(LED_BUILTIN, LOW);
            client.publish(KOLAM,"connect",0);
        } 
        else {
            Serial.print("failed, rc=");
            Serial.print(client.state());
            Serial.println(" try again in 1 seconds");
            digitalWrite(LED_BUILTIN, HIGH);
            if (WiFi.status() != WL_CONNECTED) {
               initWifiStation();
            }
            delay(1000);
        }
    }
}

void uploadOta(){
  ArduinoOTA.setPassword("always123");
  ArduinoOTA.onStart([]() {
    String type;
    if (ArduinoOTA.getCommand() == U_FLASH) {
      type = "sketch";
    } else { // U_FS
      type = "filesystem";
    }
    Serial.println("Start updating " + type);
  });
  ArduinoOTA.onEnd([]() {
    Serial.println("\nEnd");
  });
  ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
    Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
  });
  ArduinoOTA.onError([](ota_error_t error) {
    Serial.printf("Error[%u]: ", error);
    if (error == OTA_AUTH_ERROR) {
      Serial.println("Auth Failed");
    } else if (error == OTA_BEGIN_ERROR) {
      Serial.println("Begin Failed");
    } else if (error == OTA_CONNECT_ERROR) {
      Serial.println("Connect Failed");
    } else if (error == OTA_RECEIVE_ERROR) {
      Serial.println("Receive Failed");
    } else if (error == OTA_END_ERROR) {
      Serial.println("End Failed");
    }
  });
  ArduinoOTA.begin();
}

void setup() {    
    
    /////////////
    pinMode(LED_BUILTIN, OUTPUT);
    digitalWrite(LED_BUILTIN, HIGH);
    Serial.begin(115200);
    initWifiStation();
    client.setServer(mqttServer, mqttPort);
    uploadOta();
}

void loop() {
    ArduinoOTA.handle();
    if (!client.connected()) {
      reconnect();
    }
    client.loop();
    
    ///code here

    if (Serial.available() > 0) {
      char inChar = (char)Serial.read();
      dataIn += inChar;
      if (inChar == '\n') {
        parsing = true;
      }
    }

    if (parsing) {
      parsing = false;
      Serial.println(dataIn);
      dataIn.toCharArray(dataIn2, dataIn.length() + 1);
      client.publish(KOLAM,dataIn2,0);
      dataIn = "";
    }

}
