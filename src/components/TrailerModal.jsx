import YouTubePlayer from "./YoutubePlayer";

import "../styles/modal.scss";

const TrailerModal = ({ isOpen, videoKey, closeModal }) => {
  return isOpen ? (
    <div className="trailer-modal" onClick={closeModal}>
      <div className="player-wrapper">
        {videoKey ? (
          <YouTubePlayer videoKey={videoKey} />
        ) : (
          <div className="no-trailer">
            <h6>Sorry, no trailer available. Try another movie</h6>
          </div>
        )}
      </div>
      <button
        type="button"
        className="close"
        onClick={closeModal}
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  ) : (
    ""
  );
};

export default TrailerModal;
