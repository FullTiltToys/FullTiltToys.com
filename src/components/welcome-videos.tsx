const clips = [
  "/videos/doodle-disaster.mp4",
  "/videos/bulldozer.mp4",
  "/videos/oto.mp4",
];

export function WelcomeVideos() {
  return (
    <div className="w-full overflow-hidden bg-white">
      <video
        id="welcome-reel"
        src={clips[0]}
        muted
        autoPlay
        playsInline
        preload="auto"
        controls={false}
        aria-label="Doodle Disaster, Bulldozer, and OTO"
        className="aspect-video w-full object-contain"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
(function () {
  var clips = ${JSON.stringify(clips)};
  var index = 0;
  var video = document.getElementById("welcome-reel");
  if (!video) return;
  video.muted = true;
  video.defaultMuted = true;
  video.loop = false;
  video.playsInline = true;
  function playCurrent() {
    var start = video.play();
    if (start && start.catch) start.catch(function () {});
  }
  function nextClip() {
    index = (index + 1) % clips.length;
    video.src = clips[index];
    video.load();
    playCurrent();
  }
  video.addEventListener("ended", nextClip);
  video.addEventListener("canplay", playCurrent);
  playCurrent();
})();
`,
        }}
      />
    </div>
  );
}
