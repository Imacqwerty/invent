import { Link } from 'react-router-dom';
import style from './styles/Homestyle.module.css';
import { useRef, useEffect, useState } from 'react';

function Home() {
  const videoRef = useRef(null);
  const hero4Ref = useRef(null);
  const titleref = useRef(null);
  const homeref = useRef(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      // Force all attributes
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('playsinline', '');
      video.setAttribute('webkit-playsinline', '');
      
      // Try to play
      const playVideo = () => {
        video.play()
          .then(() => {
            console.log("✅ Video is playing");
            setVideoError(false);
          })
          .catch(error => {
            console.log("⚠️ Autoplay blocked:", error);
            setVideoError(true);
          });
      };

      // Try playing immediately
      playVideo();

      // Also try on page interaction
      const handleInteraction = () => {
        playVideo();
        document.removeEventListener('click', handleInteraction);
        document.removeEventListener('touchstart', handleInteraction);
      };

      document.addEventListener('click', handleInteraction);
      document.addEventListener('touchstart', handleInteraction);

      return () => {
        document.removeEventListener('click', handleInteraction);
        document.removeEventListener('touchstart', handleInteraction);
      };
    }
  }, []);

  const scrollToHero4 = () => {
    hero4Ref.current?.scrollIntoView({ behavior: 'smooth'});
  }

  const scrolltoproj = () => {
    titleref.current?.scrollIntoView({ behavior: 'smooth'});
  }

  const scrolltohome = () => {
    homeref.current?.scrollIntoView({ behavior: 'smooth'});
  }

  return (
    <div className={style.wholecanvas} ref={homeref}>
      <nav className={style.nav}>
        <div className={style.webname}>Invent</div>
        <div className={style.navlinks}>
          <div className={style.linkstyle}><a onClick={scrolltohome} style={{ cursor: 'pointer'}}>Home</a></div>
          <div className={style.linkstyle}><a onClick={scrolltoproj} style={{ cursor: 'pointer'}}>Projects</a></div>
          <div className={style.linkstyle}><a onClick={scrollToHero4} style={{ cursor: 'pointer'}}>About Me</a></div>
        </div>
      </nav>

      {/*HERO 1 */}
      <section className={style.homehero1}> 
        <video 
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          webkit-playsinline="true"
          preload="auto"
        >
          <source src="/Invent/1.mp4" type="video/mp4" />
        </video>
        
        {videoError && (
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            fontSize: '14px',
            zIndex: 2
          }}>
            Click anywhere to play video
          </div>
        )}

        <div className={style.hero1intro1}>
          <h1><strong>Welcome to Invent</strong></h1>
          <p>Created with ReactJS Framework</p>
          <p>By Kent Quilao</p>
        </div>
      </section>
      {/*END HERO 1 */}

      {/* Rest of your code... */}
      
      <section className={style.title} ref={titleref}>
        <div><h1>PROJECTS</h1></div>
      </section>

      <section className={style.homehero2}> 
        <div className={style.hero2intro1}>
          <h1>Alumni System</h1>
          <p>Made with HTML, CSS, JavaScript, Php and MySQL</p>
          <p>By Kent Quilao</p>
        </div>
        <div className={style.hero2intro2}>
          <img src="/Invent/alumni.png" alt="Alumni System" />
        </div>
      </section>

      <section className={style.homehero3}>
        <div className={style.hero3intro2}>
          <img src="/Invent/Ace.png" alt="Scholarship App" />
        </div>
        <div className={style.hero3intro1}>
          <h1>Scholarship Submission Application</h1>
          <p>Made with HTML, CSS, JavaScript, Php and MySQL</p>
          <p>By Kent Quilao</p>
        </div>
      </section>

      <section className={style.homehero4}>
        <div className={style.hero4intro1}>
          <h1>ABOUT ME</h1><br />
          <p>Computer Science student with hands-on experience in IT support and networking, including LAN/WLAN troubleshooting, VLAN configuration, and user support in academic environments. 
          <br /> Familiarity in React and Laravel web development. Seeking an IT Support, Networking, or Web Development Internship to expand technical expertise, strengthen problem-solving skills, 
          and gain practical experience with industry-standard technologies and best practices.</p>
        </div>
        <br /><br />
        <div className={style.hero4intro2} ref={hero4Ref}>
          <h2>Technology Stacks</h2>
          <div className={style.techstacks}>
            <div className={style.techimage}><img src="/Invent/react.png" className={style.img1} alt="React" /></div>
            <div className={style.techimage}><img src="/Invent/laravel.png" className={style.img2} alt="Laravel" /></div>
            <div className={style.techimage}><img src="/Invent/html.png" className={style.img3} alt="HTML" /></div>
            <div className={style.techimage}><img src="/Invent/css.png" className={style.img4} alt="CSS" /></div>
            <div className={style.techimage}><img src="/Invent/javascript.png" className={style.img5} alt="JavaScript" /></div>
          </div>
        </div>
      </section>

      <footer className={style.homefooter}>
        <p>Invent 2026</p>
        <p>Made with ReactJS</p>
      </footer>
    </div>
  );
}

export default Home;