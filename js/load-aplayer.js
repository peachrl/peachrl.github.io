document.addEventListener("DOMContentLoaded", function() {
    let apContainer = document.createElement("div");
    apContainer.id = "aplayer";
    document.body.append(apContainer);
    const ap = new APlayer({
      container: document.getElementById("aplayer"),
      fixed: true,
      audio: [
        {
          name: "错位时空",
          artist: "艾辰",
          url: "/musics/艾辰 - 错位时空.flac",
          cover: "/musics/艾辰 - 错位时空.jpg",
        },
        {
          name: "不群",
          artist: "周深",
          url: "/musics/周深 - 不群.mp3",
          cover: "/musics/周深 - 不群.jpg",
        },
        {
          name: "亲爱的旅人啊",
          artist: "周深",
          url: "/musics/周深 - 亲爱的旅人啊.mp3",
          cover: "/musics/周深 - 亲爱的旅人啊.jpg",
        },
        {
          name: "曲尽陈情",
          artist: "肖战",
          url: "/musics/肖战 - 曲尽陈情.mp3",
          cover: "/musics/肖战 - 曲尽陈情.jpg",
          lrc: "/musics/肖战 - 曲尽陈情.txt",
        },
      ],
    });
  });