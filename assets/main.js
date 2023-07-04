const URL = "https://youtube-v31.p.rapidapi.com/search?channelId=UCj3OU5RLL55NOn7mJxYI51g&part=snippet,id&order=date&maxResults=9";

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '4dd9b46f24msh06f86c627042825p1e5a70jsn0f934a39bcfc',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

const content = document.getElementById("content");

async function fetchData(urlApi) {
    try {
        const response = await fetch(urlApi, options);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

(async () => {
    try {
        const videos = await fetchData(URL);
        let view = `
            ${videos.items.map(video => `
            <div class="group relative">
                <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                </h3>
                </div>
            </div>
            `).slice(0,4).join("")}
        `;
        content.innerHTML = view;
    } catch (error) {
        console.log(error);
    }
})();
