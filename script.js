const form = document.getElementById("color-form")
const colorsContainer = document.getElementById("colors-container")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    fetchColor()
})

function fetchColor() {
    const formData = new FormData(form)
    const colorSelected = formData.get("color")
    const scheme = formData.get("scheme")
    const count = formData.get("count")
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorSelected.slice(1)}&mode=${scheme}&count=${count}`)
        .then(res => res.json())
        .then(data => {
            try {
                renderColors(data.colors)
            } catch (err) {
                colorsContainer.innerHTML = `<p>Impossibile mostrare la palette, riprova più tardi.</p>`
            }
        })
}

fetchColor()

function renderColors(colorArray) {
    colorsContainer.innerHTML = colorArray.map((color) => {
        return `
            <div class="single-color-cnt">
                <div class="color-box" style="background-color: ${color.hex.value}"></div>
                <p data-hex="${color.hex.value}">${color.hex.value}</p>
            </div>`
    }).join("")
}

colorsContainer.addEventListener("click", (e) => {
    if (e.target.dataset.hex) {
        const hexCode = e.target.dataset.hex
        navigator.clipboard.writeText(hexCode)
        e.target.textContent = "Copied!"
        setTimeout( () => {
            e.target.textContent = hexCode
        }, 2000)
    }
})

