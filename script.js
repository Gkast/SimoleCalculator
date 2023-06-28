const screen = document.getElementById("display");

let shouldClearScreenOnNextNumberClick = true;
let previousResult = 0;
let selectedOperation = 0;

document.addEventListener("click", function (event) {
    if (!(event.target instanceof Element)) {
        return;
    }
    const closestButton = event.target.closest('.btn');
    if (!closestButton) {
        return;
    }
    if (closestButton.classList.contains('number')) {
        screen.textContent = (shouldClearScreenOnNextNumberClick ? '' : screen.textContent) + closestButton.textContent;
        shouldClearScreenOnNextNumberClick = false;
    } else if (closestButton.classList.contains('function')) {
        switch (closestButton.textContent.trim()) {
            case "AC":
                screen.textContent = "0";
                previousResult = 0;
                clearSelectedOperationClass();
                selectedOperation = "";
                shouldClearScreenOnNextNumberClick = true;
                break;
            case "DEL":
                screen.textContent =
                    screen.textContent.length === 1 ? "0" : screen.textContent.substring(0, screen.textContent.length - 1);
                break;
        }

    } else if (closestButton.classList.contains('operation') && closestButton.textContent.trim() !== '=') {
        if (closestButton.classList.contains('btn-selected')) {
            return;
        }
        previousResult = parseInt(screen.textContent, 10);
        selectedOperation = closestButton.textContent.trim();
        shouldClearScreenOnNextNumberClick = true;
        clearSelectedOperationClass();
        closestButton.classList.add('btn-selected');
    } else if (closestButton.classList.contains('operation') && closestButton.textContent.trim() === '=') {
        if (selectedOperation === '') {
            return;
        }
        const currentScreenNumber = parseInt(screen.textContent, 10);
        let calculationResult =
            selectedOperation === '+' ? previousResult + currentScreenNumber :
                selectedOperation === '-' ? previousResult - currentScreenNumber :
                    selectedOperation === '*' ? previousResult * currentScreenNumber :
                        selectedOperation === '/' ? previousResult / currentScreenNumber :
                            0;

        previousResult = 0;
        selectedOperation = '';
        screen.textContent = calculationResult.toString();
        shouldClearScreenOnNextNumberClick = true;
        clearSelectedOperationClass();
    }

});

function clearSelectedOperationClass() {
    Array.from(document.getElementsByClassName('btn-selected')).forEach(btn => btn.classList.remove('btn-selected'));
}