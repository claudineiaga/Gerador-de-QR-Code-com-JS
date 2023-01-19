const container = document.querySelector(".container");
const userInput = document.getElementById("entradaDados");
const submitButton = document.getElementById("submit");
const downloadButton = document.getElementById("download");
const sizeOptions = document.querySelector(".tamanhoOpcoes");
const BGColor = document.getElementById("BGColor");
const FGColor = document.getElementById("FGColor");
let QR_code;
let sizeChoice, BGColorChoice, FGColorChoice;

sizeOptions.addEventListener("change", () => {
	sizeChoice = sizeOptions.value;
});

BGColor.addEventListener("input", () => {
	BGColorChoice = BGColor.value;
});

FGColor.addEventListener("input", () => {
	FGColorChoice = FGColor.value;
});

const inputFormatter = (value) => {
	value = value.replace(/[^a-z0-9A-Z]+/g, "");
	return value;
};
submitButton.addEventListener("click", async () => {
	container.innerHTML = "";
	QR_code = await new QRCode(container, {
		text: userInput.value,
		width: sizeChoice,
		height: sizeChoice,
		colorDark: FGColorChoice,
		colorLight: BGColorChoice
	});
	const src = container.firstChild.toDataURL("image/png");
	downloadButton.href = src;
	let userValue = userInput.value;
	try {
		userValue = new URL(userValue).hostname;
	} catch (_) {}
	userValue = inputFormatter(userValue);
	downloadButton.download = `${userValue}QR`;
	downloadButton.classList.remove("hide");
});
userInput.addEventListener("input", () => {
	if (userInput.value.trim().length < 1) {
		submitButton.disabled = true;
		downloadButton.href = "";
		downloadButton.classList.add("hide");
	} else {
		submitButton.disabled = false;
	}
});
window.onload = () => {
	container.innerHTML = "";
	sizeChoice = 100;
	sizeOptions.value = 100;
	userInput.value = "";
	BGColor.value = BGColorChoice = "#FFFFFF";
	FGColor.value = FGColorChoice = "#000000";
	downloadButton.classList.add("hide");
	submitButton.disabled = true;
};
