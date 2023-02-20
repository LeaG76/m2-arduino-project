#define FEU_ROUGE 13
#define FEU_ORANGE 12
#define FEU_VERT 11
#define FEU_PIETON_ROUGE 10
#define FEU_PIETON_VERT 9

int longTime = 10000;
int shortTime = 4000;
long int time1 = millis();
long int time2 = millis();
int step = 1;
bool order = true;

void setup() {
  Serial.begin(9600);
  pinMode(FEU_ROUGE, OUTPUT);
  pinMode(FEU_ORANGE, OUTPUT);
  pinMode(FEU_VERT, OUTPUT);
  pinMode(FEU_PIETON_ROUGE, OUTPUT);
  pinMode(FEU_PIETON_VERT, OUTPUT);
  digitalWrite(FEU_VERT, HIGH);
  digitalWrite(FEU_PIETON_ROUGE, HIGH);
}

void loop() {
   if(Serial.available()) {
    String nb = Serial.readString();
    int index = nb.indexOf("|");
    String nbWalkers = nb.substring(0, index);
    String nbCars = nb.substring(index);
    order = nbWalkers.toInt() < nbCars.toInt();
    step = 1;
    time2 += 4000;    
  }
  if(order) {
    if(time2 - time1 > 4000 && step == 1) {
      // Etat 1
      time1 = millis();
      digitalWrite(FEU_ROUGE, LOW);
      digitalWrite(FEU_ORANGE, LOW);
      digitalWrite(FEU_VERT, HIGH);
      digitalWrite(FEU_PIETON_VERT, LOW);
      digitalWrite(FEU_PIETON_ROUGE, HIGH);
      Serial.println("1");
      step = 2;
    }
    if(time2 - time1 > 10000 && step == 2) {
      // Etat 2
      time1 = millis();
      digitalWrite(FEU_ROUGE, LOW);
      digitalWrite(FEU_ORANGE, HIGH);
      digitalWrite(FEU_VERT, LOW);  
      Serial.println("2");
      step = 3;
    }
    if(time2 - time1 > 4000 && step == 3) {
      // Etat 3
      time1 = millis();
      digitalWrite(FEU_ROUGE, HIGH);
      digitalWrite(FEU_ORANGE, LOW);
      digitalWrite(FEU_VERT, LOW);
      digitalWrite(FEU_PIETON_VERT, HIGH);
      digitalWrite(FEU_PIETON_ROUGE, LOW);
      Serial.println("3");
      step= 4;
    }
    if(time2 - time1 > 10000 && step == 4) {
      // Etat 4
      time1 = millis();
      digitalWrite(FEU_ROUGE, HIGH);
      digitalWrite(FEU_ORANGE, HIGH);
      digitalWrite(FEU_VERT, LOW);  
      Serial.println("4");
      step= 1;
    }
  } else {
    if(time2 - time1 > 4000 && step == 1) {
      // Etat 3
      time1 = millis();
      digitalWrite(FEU_ROUGE, HIGH);
      digitalWrite(FEU_ORANGE, LOW);
      digitalWrite(FEU_VERT, LOW);
      digitalWrite(FEU_PIETON_VERT, HIGH);
      digitalWrite(FEU_PIETON_ROUGE, LOW);
      Serial.println("3");
      step= 2;
    }
    if(time2 - time1 > 10000 && step == 2) {
      // Etat 4
      time1 = millis();
      digitalWrite(FEU_ROUGE, HIGH);
      digitalWrite(FEU_ORANGE, HIGH);
      digitalWrite(FEU_VERT, LOW);  
      Serial.println("4");
      step= 3;
    }
    if(time2 - time1 > 4000 && step == 3) {
      // Etat 1
      time1 = millis();
      digitalWrite(FEU_ROUGE, LOW);
      digitalWrite(FEU_ORANGE, LOW);
      digitalWrite(FEU_VERT, HIGH);
      digitalWrite(FEU_PIETON_VERT, LOW);
      digitalWrite(FEU_PIETON_ROUGE, HIGH);
      Serial.println("1");
      step = 4;
    }
    if(time2 - time1 > 10000 && step == 4) {
      // Etat 2
      time1 = millis();
      digitalWrite(FEU_ROUGE, LOW);
      digitalWrite(FEU_ORANGE, HIGH);
      digitalWrite(FEU_VERT, LOW);  
      Serial.println("2");
      step = 1;
    }
  }
  time2 = millis();
}