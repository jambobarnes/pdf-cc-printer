const { jsPDF } = require("jspdf");

const data = [
  {
    name: "Jason Robotham",
    id: "ND23-2455-1",
    type: "ADULT",
    attendance: "M Tu W Th F",
  },
  {
    name: "Michelle Rawlinson",
    id: "ND23-2485-3",
    type: "CHILD",
    attendance: "W Th F",
  },
];

const doc = new jsPDF({
  orientation: "p",
  unit: "mm",
  format: [54, 86],
});

const shrinkToFit = (nameString, fontSize) => {

  let theFontSize = fontSize;
  const length = doc.getStringUnitWidth(nameString);
  const lengthInPoints = length * fontSize;
  const lengthInMM = (lengthInPoints + 5) / (72 / 25.6);

  if (lengthInMM > 50) {
    theFontSize = theFontSize - 0.5;
    return shrinkToFit(nameString, theFontSize);
  } else {
    return theFontSize;
  }

}

for (let i = 0; i < data.length; i++) {

  if (i !== 0) {
    doc.addPage();
  }

  const nameStr = data[i].name;
  const delegateName = nameStr.toUpperCase();

  let fontSize = 11.5
  fontSize = shrinkToFit(delegateName, fontSize);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(fontSize);
  doc.text(delegateName, 2, 77);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.text(`${data[i].id}  ${data[i].type}  ${data[i].attendance}`, 2, 81);

}

doc.save("test.pdf");
console.log("Saved...");
