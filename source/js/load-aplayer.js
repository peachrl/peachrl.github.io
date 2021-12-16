document.addEventListener("DOMContentLoaded", function() {
  let apContainer = document.createElement("div");
  apContainer.id = "aplayer";
  document.body.append(apContainer);
  const ap = new APlayer({
    container: document.getElementById("aplayer"),
    fixed: true,
    lrcType: 3,
    audio: [
      {
        name: "时结",
        artist: "周深",
        url: "/musics/周深 - 时结.flac",
        cover: "/musics/周深 - 时结.png",
        lrc: "/musics/周深 - 时结.lrc",
      },
      {
        name: "错位时空",
        artist: "艾辰",
        url: "/musics/艾辰 - 错位时空.flac",
        cover: "/musics/艾辰 - 错位时空.jpg",
        lrc: "/musics/艾辰 - 错位时空.lrc",
      },
      {
        name: "不群",
        artist: "周深",
        url: "/musics/周深 - 不群.mp3",
        cover: "/musics/周深 - 不群.jpg",
        lrc: "/musics/周深 - 不群.lrc",
      },
      {
        name: "亲爱的旅人啊",
        artist: "周深",
        url: "/musics/周深 - 亲爱的旅人啊.mp3",
        cover: "/musics/周深 - 亲爱的旅人啊.jpg",
        lrc: "/musics/周深 - 亲爱的旅人啊.lrc",
      },
      {
        name: "曲尽陈情",
        artist: "肖战",
        url: "/musics/肖战 - 曲尽陈情.mp3",
        cover: "/musics/肖战 - 曲尽陈情.jpg",
        lrc: "/musics/肖战 - 曲尽陈情.lrc",
      },
      {
        name: "瞳のこたえ",
        artist: "Noria",
        url: "/musics/Noria - 瞳のこたえ.mp3",
        cover: "/musics/Noria - 瞳のこたえ.jpg",
        lrc: "/musics/Noria - 瞳のこたえ.lrc",
      },
      {
        name: "Rubia",
        artist: "周深",
        url: "/musics/周深 - Rubia.mp3",
        cover: "/musics/周深 - Rubia.jpg",
        lrc: "/musics/周深 - Rubia.lrc",
      },
      {
        name: "不舍",
        artist: "徐佳莹",
        url: "/musics/徐佳莹 - 不舍.flac",
        cover: "/musics/徐佳莹 - 不舍.jpg",
        lrc: "/musics/徐佳莹 - 不舍.lrc",
      },
      {
        name: "Unravel",
        artist: "周深",
        url: "/musics/周深 - Unravel.mp3",
        cover: "/musics/周深 - Unravel.jpg",
        lrc: "/musics/周深 - Unravel.lrc",
      },
      {
        name: "相拥各自不完整",
        artist: "张韶涵",
        url: "/musics/张韶涵 - 相拥各自不完整.flac",
        cover: "/musics/张韶涵 - 相拥各自不完整.jpg",
        lrc: "/musics/张韶涵 - 相拥各自不完整.lrc",
      },
      {
        name: "化身孤岛的鲸",
        artist: "周深",
        url: "/musics/周深 - 化身孤岛的鲸.flac",
        cover: "/musics/周深 - 化身孤岛的鲸.jpg",
        lrc: "/musics/周深 - 化身孤岛的鲸.lrc",
      },
    ],
  });
});