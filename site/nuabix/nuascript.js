// N진수 설정
var N = 55000;

var xhr = new XMLHttpRequest();
var url = "https://nuabix.github.io/site/data/text.txt";
xhr.open("GET", url, true); 

xhr.onload = function() {
  if (xhr.status == 200) {
    var v = xhr.responseText;

    // 리스트 설정
    var A = 0, B = 0;
    var list = ["Lodion"];
    for (var i = 0; i < v.length; i++) {
        A++; B++;
        if (A.toString().includes("0")) {
            while (A.toString().includes("0")) {
                list.push(" "); A++;
            }
            list.push(v[B-1]);
        } else {
            list.push(v[B-1]);
        }
    }

    // 암호화 함수
    function encrypt() {
      let plain = document.getElementById("plain").value;
      let cipher = enco(BigInt("1" + LOD(plain)));
      document.getElementById("cipher").value = cipher;
    }

    // 복호화 함수
    function decrypt() {
      let plain = document.getElementById("plain").value;
      let cipher = IOD(String(deco(plain)).slice(1));
      document.getElementById("cipher").value = cipher;
    }

    function LOD(text) {
      let numberC = 0;
      let cloud = "";
      for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (list.includes(char)) {
          numberC += 1;
          cloud = cloud + "0" + list.indexOf(char);
        } else {
          cloud = cloud + "0" + list.indexOf("?");
        }
      }
      return cloud;
    }

    function IOD(text) {
      let result = "";
      let numberD = 0;
      let numberE = 0;
      let listB = [];
      text += "01";
      for (let i = 0; i < text.length; i++) {
        numberD += 1;
        if (text[numberD - 1] == "0") {
          numberE = numberD + 1;
          listB = [];
          while (numberE < text.length && text[numberE - 1] != "0") {
            listB.push(text[numberE - 1]);
            numberE += 1;
          }
          if (numberE >= text.length) {
            return result;
          }
          result += list[parseInt(listB.join(""))];
        }
      }
      return result;
    }

    function enco(n) {
      let rev_base = "";
      while (n > 0) {
        let mod = n % BigInt(N);
        n = n / BigInt(N);
        rev_base += String.fromCharCode(Number(mod));
      }
      return rev_base.split("").reverse().join("");
    }

    function deco(s) {
      let result = 0n;
      for (let i = 0; i < s.length; i++) {
        let num = BigInt(s.charCodeAt(i));
        result += num * (BigInt(N) ** BigInt(s.length - i - 1));
      }
      return result;
    }

    // onclick 이벤트
    document.getElementById("encrypt").onclick = function() {encrypt()};
    document.getElementById("decrypt").onclick = function() {decrypt()};
    
  }
};

// 요청을 전송
xhr.send();
