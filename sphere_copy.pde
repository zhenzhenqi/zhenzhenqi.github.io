/import peasy.test.*;
//import peasy.org.apache.commons.math.*;
//import peasy.*;
//import peasy.org.apache.commons.math.geometry.*;
//
//
//PeasyCam  cam;

float r_sphere = 1000;
float phi = 0;

float step = 0.1; //controls how smooth the curve is
float angel = 0;

float n = 18; //n and sList controls how many rings in total are generated.

PVector defaultColor = new PVector(147, 150, 191); //initial color specified by client
PVector transitionColor = new PVector(237, 18, 135);//transition color specified by client

ArrayList<Float> thetaList = new ArrayList<Float>(); //stores x y plane angles
ArrayList<Float> phiList = new ArrayList<Float>(); //x y plane angle multiplied by three
ArrayList<Float> sList = new ArrayList<Float>();  //controls how many rings are generated 
ArrayList<PVector> cList = new ArrayList<PVector>();  //controls each ring's color
ArrayList<Float> tList = new ArrayList<Float>();  //controls each ring's stroke weight

void setup() {
  //camera(-800.0, 1800.0, 1000.0, 0, 0, 0, 
  //       0.0, 1.0, 0.0);
  size(600, 600, P3D);


  //  cam = new PeasyCam(this, 10);
  //  cam.setMinimumDistance(100);
  //  cam.setMaximumDistance(4000);

  for (float theta=0; theta<PI*2+step*3; theta+=step) {
    thetaList.add(theta);
    phiList.add(theta*3);
  }

  //sList controls how many rings are generated
  for (int i=0; i<n; i++) {
    sList.add(PI/2-i/n*PI);
    cList.add(defaultColor.get());
    tList.add(1.4);
  }
}

void draw() {  
  background(255);
  rotateX(PI/3);

  pushMatrix();
  translate(300, -1800, -1400);
  ArrayList<ArrayList> allLists = new ArrayList<ArrayList>();
  for (int i=0; i<sList.size (); i++) {
    float phi = 0;
    float tempZ = 0;

    ArrayList<PVector> tempList = new ArrayList<PVector>();
    for (int j=0; j<thetaList.size (); j++) {
      float tempX = r_sphere*cos(thetaList.get(j));
      float tempY = r_sphere*sin(thetaList.get(j));
      tempZ = r_sphere/2*cos(phiList.get(j)) + r_sphere*tan(sList.get(i));

      float finalX = sq(r_sphere)/sqrt(sq(r_sphere)+sq(tempZ))*cos(thetaList.get(j));
      float finalY = sq(r_sphere)/sqrt(sq(r_sphere)+sq(tempZ))*sin(thetaList.get(j)); 
      float finalZ = tempZ*r_sphere/sqrt(sq(r_sphere)+sq(tempZ));

      PVector tempPoint = new PVector(finalX, finalY, finalZ);
      tempList.add(tempPoint);
    }
    allLists.add(tempList);
  }

  for (int i=0; i<thetaList.size (); i++) {
    float tempT = thetaList.get(i);
    thetaList.set(i, tempT+0.003);
  }

  int mouseY_mapped = -1;
  if (dist(mouseX, mouseY, width/2, height/2)<200) {
    mouseY_mapped = int(map(mouseY, height/2-200, height/2+200, 0, sList.size()));
  }

  for (int i=0; i<allLists.size (); i++) {

    float fadeInSpeed = 0.1;
    float fadeOutSpeed = 0.1;
    float thicknessSpeed = 0.1;
    if (i == mouseY_mapped) {
      if (dist(cList.get(i).x, cList.get(i).y, cList.get(i).z, transitionColor.x, transitionColor.y, transitionColor.z)>10) {
        cList.get(i).set(lerp(cList.get(i).x, transitionColor.x, fadeInSpeed), lerp(cList.get(i).y, transitionColor.y, fadeInSpeed), lerp(cList.get(i).z, transitionColor.z, fadeInSpeed));
      }
      if (tList.get(i) < 3) {
          tList.set(i, tList.get(i) + thicknessSpeed);
      }
      println(tList.get(i));
    } else {
      if (dist(cList.get(i).x, cList.get(i).y, cList.get(i).z, defaultColor.x, defaultColor.y, defaultColor.z)>10) {
        cList.get(i).set(lerp(cList.get(i).x, defaultColor.x, fadeOutSpeed), lerp(cList.get(i).y, defaultColor.y, fadeOutSpeed), lerp(cList.get(i).z, defaultColor.z, fadeOutSpeed));

      }
      if (tList.get(i) > 1) {
          tList.set(i, tList.get(i) - thicknessSpeed);
       }
    };
    beginShape();
    strokeWeight(tList.get(i));
    for (int j=0; j<allLists.get (i).size(); j++) {

      PVector tt = new PVector();
      tt = (PVector) allLists.get(i).get(j);

      float mappedStrokeWeight = map(tt.y, r_sphere/5, -r_sphere, 7, 2);
      float mappedAlpha = map(tt.y, r_sphere/5, -r_sphere, 255, 60);
      
      stroke(cList.get(i).x, cList.get(i).y, cList.get(i).z, mappedAlpha);
      noFill();
      curveVertex(tt.x, tt.y, tt.z);
    }
    endShape();
  }
  popMatrix();

  for (int i=0; i<sList.size (); i++) {
    if (sList.get(i)<-PI/2) {
      sList.set(i, PI/2);
    } else {
      sList.set(i, sList.get(i)-0.003);
    }
  }
}