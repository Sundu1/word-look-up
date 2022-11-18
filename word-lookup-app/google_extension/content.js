async function oxfordAPI(word) {
  try {
    const response = await fetch(`http://localhost:5000/${word}`);
    const data = await response.json();

    if (data.status === 404) return data.response;
    else {
      return data.results[0].lexicalEntries[0].entries[0].senses[0]
        .definitions[0];
    }
  } catch (error) {
    console.error(error);
  }
}

async function selection() {
  let text = "";
  if (window.getSelection) {
    const selection = window.getSelection();
    text = selection.toString().trim();

    let rect = selection.getRangeAt(0).getBoundingClientRect();
    const container = document.createElement("div");
    container.classList.add("container");
    const control = document.createElement("div");
    control.classList.add("newWordPopUpBox");
    const yValue = window.pageYOffset + rect.top;
    control.style.transform = `translate(${rect.x}px, ${yValue}px)`;

    control.innerHTML = await oxfordAPI(text);

    container.appendChild(control);
    document.body.appendChild(container);
  }
}

document.onpointerdown = () => {
  let container = document.querySelector(".container");
  if (container !== null) {
    container.remove();
    document.getSelection().removeAllRanges();
  }
};

document.addEventListener("dblclick", selection);
