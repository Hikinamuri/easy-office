// Telegram Bot configuration (замените на ваши реальные значения)
const TELEGRAM_BOT_TOKEN = "7524644623:AAE6YasVXvYnnNH-xrbSH_odIHEqD_b15oo"; // Токен вашего Telegram бота
const TELEGRAM_CHAT_ID = "-1002695033602"; // ID чата, куда отправлять сообщения (например, ваш личный чат ID)

// Function to send message to Telegram Bot
async function sendToTelegram(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    try {
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: "HTML", // Для форматирования, если нужно
            }),
        });
    } catch (error) {
        console.error("Ошибка при отправке в Telegram:", error);
    }
}

// Form submission with Telegram integration (using capture phase to run before inline handler)
document.addEventListener(
    "submit",
    async function (e) {
        if (e.target.tagName !== "FORM") return;

        const form = e.target;
        e.preventDefault(); // Prevent default form submission

        try {
            // Collect form data manually by IDs (since no 'name' attributes in HTML)
            const modalType = form.id.replace("-form", "");
            let name = "",
                phone = "",
                email = "",
                message = "";
            let analysisObject = "",
                analysisArea = "",
                analysisLocation = "",
                analysisCondition = "";
            let brokersCompany = "";

            if (modalType === "consultation") {
                const nameEl = document.getElementById("consult-name");
                const phoneEl = document.getElementById("consult-phone");
                const emailEl = document.getElementById("consult-email");
                const messageEl = document.getElementById("consult-message");
                name = nameEl ? nameEl.value : "";
                phone = phoneEl ? phoneEl.value : "";
                email = emailEl ? emailEl.value : "";
                message = messageEl ? messageEl.value : "";
            } else {
                const nameEl = document.getElementById(`${modalType}-name`);
                const phoneEl = document.getElementById(`${modalType}-phone`);
                const emailEl = document.getElementById(`${modalType}-email`);
                const messageEl = document.getElementById(
                    `${modalType}-message`
                );
                name = nameEl ? nameEl.value : "";
                phone = phoneEl ? phoneEl.value : "";
                email = emailEl ? emailEl.value : "";
                message = messageEl ? messageEl.value : "";
            }

            if (modalType === "analysis") {
                const objEl = document.getElementById("analysis-object");
                const areaEl = document.getElementById("analysis-area");
                const locEl = document.getElementById("analysis-location");
                const condEl = document.getElementById("analysis-condition");
                analysisObject = objEl ? objEl.value : "";
                analysisArea = areaEl ? areaEl.value : "";
                analysisLocation = locEl ? locEl.value : "";
                analysisCondition = condEl ? condEl.value : "";
            } else if (modalType === "brokers") {
                const compEl = document.getElementById("brokers-company");
                brokersCompany = compEl ? compEl.value : "";
            }

            // Format message based on form type
            let telegramMessage = `🆕 <b>Новая заявка: ${modalType.toUpperCase()}</b>\n\n`;
            telegramMessage += `👤 Имя: ${name || "Не указано"}\n`;
            telegramMessage += `📞 Телефон: ${phone || "Не указано"}\n`;
            telegramMessage += `✉️ Email: ${email || "Не указано"}\n`;

            if (modalType === "analysis") {
                telegramMessage += `🏢 Тип объекта: ${
                    analysisObject || "Не указано"
                }\n`;
                telegramMessage += `📏 Площадь: ${
                    analysisArea || "Не указано"
                } м²\n`;
                telegramMessage += `📍 Местоположение: ${
                    analysisLocation || "Не указано"
                }\n`;
                telegramMessage += `🔧 Состояние: ${
                    analysisCondition || "Не указано"
                }\n`;
            } else if (modalType === "brokers") {
                telegramMessage += `🏢 Компания: ${
                    brokersCompany || "Не указано"
                }\n`;
            }

            telegramMessage += `💬 Сообщение: ${message || "Не указано"}\n`;
            telegramMessage += `\n⏰ Дата/время: ${new Date().toLocaleString(
                "ru-RU"
            )}`;

            // Send to Telegram
            await sendToTelegram(telegramMessage);
        } catch (error) {
            console.error("Ошибка в обработчике формы:", error);
        }
        // Do not reset or close here - let the inline handler do it after this capture-phase handler
    },
    true
); // Capture phase to run BEFORE the inline bubble-phase handler

// Initialize
document.addEventListener("DOMContentLoaded", function () {
    updateCasesDisplay();

    // Responsive adjustments - show one on all sizes
    function handleResize() {
        updateCasesDisplay();
    }

    window.addEventListener("resize", handleResize);
    handleResize();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: "smooth",
            });
        }
    });
});
