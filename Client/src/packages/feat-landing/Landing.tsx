import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Backdrop, Button } from "@mui/material";
import {
  Diversity1,
  Filter1Rounded,
  Filter2Rounded,
  Filter3Rounded,
  SportsTennis,
} from "@mui/icons-material";
import { GlobalStyles, LHtml, Lbody } from "./components";
import { useAuthentication } from "../feat-Auth/authUtils";

const LandingPage = () => {
  const isAuthenticated = useAuthentication();
  const navigate = useNavigate();

  const cards = [
    {
      image: "/images/serve.jpeg",
      title: "Serve",
      intro:
        "Learn the perfect technique to start the game with precision and power.",
    },
    {
      image: "/images//backhand.jpeg",
      title: "backhand",
      intro:
        "Improve your backhand technique and gain an edge over your competitors.",
    },
    {
      image: "/images//forehand.jpeg",
      title: "forehand",
      intro:
        "Discover the secrets to a strong and deadly forehand shot that will leave your opponents in awe.",
    },
  ];
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);
  if (isAuthenticated) return <Backdrop color="#b8b0b0" open={true}></Backdrop>;
  return (
    <LHtml>
      <Lbody>
        <GlobalStyles />
        <header role="banner" className="ui-section-header">
          <div className="ui-layout-container">
            <div className="ui-section-header__layout ui-layout-flex">
              <h1> {"PING PONG"} </h1>
              <Button
                variant="contained"
                onClick={() => handleOpen()}
                endIcon={<Diversity1 />}
              >
                Join us
              </Button>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
              ></Backdrop>
            </div>
          </div>
        </header>
        <main role="main">
          <section className="ui-section-hero">
            <div className="ui-layout-container">
              <div className="ui-layout-column-6 ui-layout-column-center">
                <h1>Welcome to the Ultimate Ping Pong Game Platform</h1>
                <p className="ui-text-intro">
                  Experience the thrill of the fastest racket sport in the
                  world. Join our platform and take your ping pong skills to the
                  next level!
                </p>
                <div className="ui-component-cta ui-layout-flex"></div>
              </div>
              <img
                src={"/images/landing.jpg"}
                alt="ping"
                className="ui-section-hero--image"
              />
            </div>
          </section>
          <section className="ui-section-skills" id="skills">
            <div className="ui-layout-container">
              <h2>Skills</h2>
              <p className="ui-text-intro">Master Your Skills</p>
              <div className="ui-section-skills__layout ui-layout-grid ui-layout-grid-3">
                {cards.map((item) => (
                  <div className="ui-component-card ui-layout-column-4">
                    <img
                      src={item.image}
                      loading="lazy"
                      alt="#"
                      className="ui-component-card--image"
                    />
                    <h4 className="ui-component-card--title">{item.title}</h4>
                    <p>{item.intro}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="ui-section-close" id="features">
            <div className="ui-layout-container">
              <div className="ui-layout-column-6 ui-layout-column-center">
                <h2>Track Your Progress</h2>
                <div>
                  <h3>
                    <Filter1Rounded /> Stats
                  </h3>
                  <p>
                    View your detailed game stats, including win-loss ratio,
                    points scored, and more.
                  </p>
                  <br />
                </div>
                <div>
                  <h3>
                    <Filter2Rounded /> Achievements
                  </h3>
                  <p>
                    Unlock achievements as you reach new milestones, proving
                    your dedication and skill.
                  </p>
                  <br />
                </div>
                <div>
                  <h3>
                    <Filter3Rounded /> Leaderboards
                  </h3>
                  <p>
                    Compete against players worldwide and climb to the top of
                    the global rankings.
                  </p>
                  <br />
                </div>
              </div>
            </div>
          </section>
          <section className="ui-section-skills" id="chat">
            <div className="ui-layout-container">
              <h2>Chat</h2>
              <p className="ui-text-intro">
                Our platform offers a variety of chat options to keep the
                conversation going, including:
              </p>
              <div className="ui-section-skills__layout ui-layout-grid ui-layout-grid-3">
                <div className="ui-component-card ui-layout-column-4">
                  <h4 className="ui-component-card--title">Private Chat</h4>
                  <p>
                    Enjoy a private conversation with another user, whether it's
                    for more personal discussions or just to chat about ping
                    pong strategies.
                  </p>
                </div>
                <div className="ui-component-card ui-layout-column-4">
                  <h4 className="ui-component-card--title">Group Chat</h4>
                  <p>
                    Join and create groups to chat with multiple users at once,
                    coordinate games, and share tips and tricks.
                  </p>
                </div>
                <div className="ui-component-card ui-layout-column-4">
                  <h4 className="ui-component-card--title">Channels</h4>
                  <p>
                    <br />
                    Browse popular channels to stay informed about the latest
                    trends and news in the ping pong world.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className="ui-component-cta ui-layout-flex">
            <Button
              variant="outlined"
              onClick={handleOpen}
              endIcon={<SportsTennis />}
              sx={{
                width: "200px",
              }}
            >
              let's Go Play
            </Button>
          </div>
        </main>

        <footer role="contentinfo" className="ui-section-footer">
          <div className="ui-layout-container">
            <div className="ui-section-footer__layout ui-layout-flex">
              <p className="ui-section-footer--copyright ui-text-note">
                <small>Mozilla Firefox 115.4.0esr soon.</small>
              </p>
              <a
                href="#chat"
                role="link"
                aria-label="#"
                className="ui-text-note"
              >
                <small>chat</small>
              </a>
              <a
                href="#features"
                role="link"
                aria-label="#"
                className="ui-text-note"
              >
                <small>Features</small>
              </a>
              <a
                href="#skills"
                role="link"
                aria-label="#"
                className="ui-text-note"
              >
                <small>skills</small>
              </a>
              <a href="#" role="link" aria-label="#" className="ui-text-note">
                <small>Help</small>
              </a>
            </div>
          </div>
        </footer>
      </Lbody>
    </LHtml>
  );
};

export default LandingPage;
export { LandingPage };
