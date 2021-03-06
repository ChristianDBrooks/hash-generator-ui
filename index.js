const API_URL = "https://node-hash-generator-api.herokuapp.com"
const form = document.querySelector("form");
const algorithmSelect = document.querySelector('select[name="algorithm"]');
const hashOutputEl = document.querySelector('input[name="output"');
const optionalSaltEl = document.querySelector('input[name="salt"]');
const randomSaltEl = document.querySelector('input[name="randomSalt"]');
const copyStatusEl = document.querySelector('#copyStatus');
const cryptoAlgorithms = [
  "RSA-MD4",
  "RSA-MD5",
  "RSA-MDC2",
  "RSA-RIPEMD160",
  "RSA-SHA1",
  "RSA-SHA1-2",
  "RSA-SHA224",
  "RSA-SHA256",
  "RSA-SHA3-224",
  "RSA-SHA3-256",
  "RSA-SHA3-384",
  "RSA-SHA3-512",
  "RSA-SHA384",
  "RSA-SHA512",
  "RSA-SHA512/224",
  "RSA-SHA512/256",
  "RSA-SM3",
  "blake2b512",
  "blake2s256",
  "id-rsassa-pkcs1-v1_5-with-sha3-224",
  "id-rsassa-pkcs1-v1_5-with-sha3-256",
  "id-rsassa-pkcs1-v1_5-with-sha3-384",
  "id-rsassa-pkcs1-v1_5-with-sha3-512",
  "md4",
  "md4WithRSAEncryption",
  "md5",
  "md5-sha1",
  "md5WithRSAEncryption",
  "mdc2",
  "mdc2WithRSA",
  "ripemd",
  "ripemd160",
  "ripemd160WithRSA",
  "rmd160",
  "sha1",
  "sha1WithRSAEncryption",
  "sha224",
  "sha224WithRSAEncryption",
  "sha256",
  "sha256WithRSAEncryption",
  "sha3-224",
  "sha3-256",
  "sha3-384",
  "sha3-512",
  "sha384",
  "sha384WithRSAEncryption",
  "sha512",
  "sha512-224",
  "sha512-224WithRSAEncryption",
  "sha512-256",
  "sha512-256WithRSAEncryption",
  "sha512WithRSAEncryption",
  "shake128",
  "shake256",
  "sm3",
  "sm3WithRSAEncryption",
  "ssl3-md5",
  "ssl3-sha1",
  "whirlpool",
];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  handleSubmit(event);
});

const copyHash = () => {
  if (!hashOutputEl.value) return;
  hashOutputEl.select();
  document.execCommand("copy");
  copyStatusEl.style.color = "#00b887";
  copyStatusEl.textContent = "Copied to Clipboard!";
}

hashOutputEl.onclick = () => copyHash();
hashOutputEl.onkeyup = (e) => {
  console.log(e)
  if (e.key === "Enter") copyHash();
};

randomSaltEl.onclick = () => {
  const useRandomSalt = randomSaltEl.checked;
  if (useRandomSalt) {
    optionalSaltEl.setAttribute("readonly", "readonly");
  } else {
    optionalSaltEl.removeAttribute("readonly");
    optionalSaltEl.value = "";
  }
}

function handleSubmit(event) {
  const form = event.target;
  const formData = new FormData(form);
  const urlEncodedData = new URLSearchParams(formData).toString();

  fetch(API_URL + "/hash/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlEncodedData,
  })
    .then((res) => res.json())
    .then((data) => {
      hashOutputEl.value = data.hash;
      optionalSaltEl.value = data.salt;
      copyStatusEl.style.color = "var(--p-color)";
      copyStatusEl.textContent = "Click to Copy";
    });
}

function generateOptions() {
  cryptoAlgorithms.forEach((alg) => {
    const option = document.createElement("option");
    option.value = alg;
    option.text = alg;
    if (alg == "sha256") option.setAttribute("selected", true);
    algorithmSelect.appendChild(option);
  });
}

generateOptions();
