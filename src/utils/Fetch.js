/**
 * Отправляет запрос на
 * @async
 * @param {String} url - url
 * @param {Object} options default method - GET
 * @returns {Promise<Response>} Promise<Response>
 */
export default async function Fetch(url, options = {}) {

    if (!url) throw new Error("Не передан url в метод отправки запроса")

    const response = await fetch("" + url, options)

    if (response.ok) {
        try {
            return await response.json()
        } catch (e) {
            console.error("Ошибка при попытке распарсить ответ")
            console.table( {
                errorMessage: e.message,
                requestUrl: url,
                requestOptions: options,
            })
        }
    } else {
        try {
            const errorData = await response.json()
            console.error(`Ошибка в запросе к /api/${url} `, {
                response: errorData,
                requestOptions: options,
            })
            return errorData
        } catch (e) {
            console.error("Ошибка при попытке распарсить ответ - ", {
                errorMessage: e.message,
                requestUrl: url,
                requestOptions: options,
            })
        }
    }

}

