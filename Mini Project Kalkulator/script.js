document.addEventListener("DOMContentLoaded", () => {
  // Memastikan seluruh kode JavaScript berjalan setelah DOM selesai dimuat.
  // Ini penting agar elemen-elemen HTML yang diakses di JavaScript sudah ada ketika kode dijalankan.

  const displayHistory = document.querySelector(".display-history");
  const display = document.querySelector(".display-input");
  const tempResult = document.querySelector(".temp-result");
  const number = document.querySelectorAll(".number");
  const operation = document.querySelectorAll(".operation");
  const equal = document.querySelector(".equal");
  const clearAll = document.querySelector(".all-clear");
  const clearLast = document.querySelector(".last-entity-clear");

  // Mendeklarasikan variabel untuk menyimpan referensi ke elemen-elemen HTML menggunakan class-nya.
  // displayHistory: untuk menampilkan riwayat operasi matematika.
  // display: untuk menampilkan input angka yang sedang diketik pengguna.
  // tempResult: untuk menampilkan hasil sementara dari operasi matematika.
  // number, operation, equal, clearAll, clearLast: referensi ke tombol angka, operasi, dan fungsi clear pada kalkulator.

  let dis1Num = ""; // Variabel untuk menyimpan angka pertama dalam operasi matematika.
  let dis2Num = ""; // Variabel untuk menyimpan angka kedua dalam operasi matematika.
  let result = 0; // Variabel untuk menyimpan hasil operasi. Diinisialisasi ke 0.
  let lastOperation = ""; // Variabel untuk menyimpan operasi terakhir yang dipilih (misalnya +, -, x, /).
  let haveDot = false; // Flag untuk mengecek apakah pengguna sudah memasukkan titik desimal.

  // Event listener untuk setiap tombol angka.
  number.forEach((number) => {
    number.addEventListener("click", (e) => {
      // Jika angka yang diklik adalah titik (.) dan belum ada titik di angka saat ini, izinkan memasukkan titik.
      if (e.target.innerText === "." && !haveDot) {
        haveDot = true;
      } else if (e.target.innerText === "." && haveDot) {
        return; // Jika sudah ada titik, tidak izinkan menambah titik lagi.
      }
      // Tambahkan angka yang diklik ke dis2Num (angka kedua), dan tampilkan di layar input.
      dis2Num += e.target.innerText;
      display.innerText = dis2Num; // Menampilkan angka yang sedang diketik di layar kalkulator.
    });
  });

  // Event listener untuk setiap tombol operasi matematika (+, -, *, /).
  operation.forEach((operation) => {
    operation.addEventListener("click", (e) => {
      if (!dis2Num) return; // Jika belum ada angka kedua yang diinput, hentikan operasi.

      haveDot = false; // Reset flag titik desimal saat operasi matematika dipilih.

      const operationName = e.target.innerText; // Ambil nama operasi dari tombol yang diklik (misalnya + atau -).
      if (dis1Num && dis2Num && lastOperation) {
        mathOperation(); // Jika ada angka pertama, kedua, dan operasi sebelumnya, lakukan operasi matematika.
      } else {
        result = parseFloat(dis2Num); // Jika ini operasi pertama, simpan angka kedua sebagai hasil awal.
      }
      clearVar(operationName); // Panggil fungsi untuk membersihkan angka input setelah operasi dipilih.
      lastOperation = operationName; // Simpan operasi terakhir yang dipilih.
    });
  });

  // Fungsi untuk membersihkan variabel input dan memperbarui layar kalkulator.
  function clearVar(name = "") {
    dis1Num += dis2Num + " " + name + " "; // Tambahkan angka kedua dan operasi yang dipilih ke riwayat.
    if (displayHistory) displayHistory.innerText = dis1Num; // Perbarui riwayat operasi di layar kalkulator.
    if (display) display.innerText = ""; // Kosongkan layar input untuk angka selanjutnya.
    dis2Num = ""; // Kosongkan angka kedua untuk input berikutnya.
    if (tempResult) tempResult.innerText = result; // Tampilkan hasil sementara di layar kalkulator.
  }

  // Fungsi untuk melakukan operasi matematika.
  function mathOperation() {
    if (lastOperation === "X" || lastOperation === "x") {
      result = parseFloat(result) * parseFloat(dis2Num); // Operasi perkalian.
    } else if (lastOperation === "+") {
      result = parseFloat(result) + parseFloat(dis2Num); // Operasi penjumlahan.
    } else if (lastOperation === "-") {
      result = parseFloat(result) - parseFloat(dis2Num); // Operasi pengurangan.
    } else if (lastOperation === "/") {
      result = parseFloat(result) / parseFloat(dis2Num); // Operasi pembagian.
    } else if (lastOperation === "%") {
      result = parseFloat(result) % parseFloat(dis2Num); // Operasi modulus (sisa bagi).
    }
    // Setel hasil operasi ke tempResult setelah operasi selesai.
    if (tempResult) tempResult.innerText = result; // Menampilkan hasil operasi sementara di layar kalkulator.
  }

  equal.addEventListener("click", () => {
    if (!dis1Num || !dis2Num) return; // Jika tidak ada angka kedua atau riwayat operasi, hentikan operasi.
    haveDot = false; // Reset flag titik desimal saat tombol sama dengan (=) diklik.
    mathOperation(); // Panggil fungsi untuk melakukan operasi matematika.
    clearVar(); // Panggil fungsi untuk membersihkan variabel input setelah operasi selesai.
    display.innerText = result; // Tampilkan hasil operasi di layar kalkulator.
    tempResult.innerText = "";
    dis2Num = result;
    dis1Num = "";
  });

  clearAll.addEventListener("click", () => {
    dis1Num = "";
    dis2Num = "";
    haveDot = false;
    displayHistory.innerText = "";
    display.innerText = "";
    result = 0;
    tempResult.innerText = "";
    lastOperation.innerText = "";
  });

  clearLast.addEventListener("click", () => {
    display.innerText = ""; // Kosongkan layar input.
    dis2Num = ""; // Kosongkan angka kedua.
  });
  // untuk mengambil fungsi dari keyboard input
  window.addEventListener("keydown", (e) => {
    if (
      e.key === "0" ||
      e.key === "1" ||
      e.key === "2" ||
      e.key === "3" ||
      e.key === "4" ||
      e.key === "5" ||
      e.key === "6" ||
      e.key === "7" ||
      e.key === "8" ||
      e.key === "9" ||
      e.key === "."
    ) {
      clickButton(e.key); //untuk memanggil fungsi clickButton
    } else if (
      e.key === "+" ||
      e.key === "-" ||
      e.key === "/" ||
      e.key === "%"
    ) {
      clickOperation(e.key); //untuk memanggil fungsi clickOperation
    } else if (e.key === "*") {
      clickOperation("X");
    } else if (e.key === "Enter" || e.key === "=") {
      clickEqual();
    } else if (e.key === "Backspace") {
      clickClearAll();
    }
  });
  //  untuk mengambil input dari keyboard
  function clickButton(key) {
    number.forEach((button) => {
      if (button.innerText === key) {
        button.click();
      }
    });
  }
  //  untuk mengambil operasi dari keyboard
  function clickOperation(key) {
    operation.forEach((operation) => {
      if (operation.innerText === key) {
        operation.click();
      }
    });
  }
  //  untuk mengambil hasil dari keyboard
  function clickEqual() {
    equal.click();
  }
  // untuk menghapus semuanya
  function clickClearAll() {
    clearAll.click();
  }
});
