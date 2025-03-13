let num = 1;
let t = "<table border=1>";

for (let i = 1; i <= 5; i++) {
    t += "<tr>";
debugger;
    for (let k = 1; k <= 5; k++) {
        t += "<td>" + num + "</td>";
        num++;
    }

    t += "</tr>";
}

t += "</table>";
console.log(t);
document.write(t);