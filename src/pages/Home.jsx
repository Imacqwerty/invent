import { Link } from 'react-router-dom';
import style from './styles/Homestyle.module.css';
import { useRef } from 'react';

function Home() {
const hero4Ref = useRef(null);
const titleref = useRef(null);
const homeref = useRef(null);

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
    
    <div className={style.wholecanvas}  ref={homeref}>
      <nav className={style.nav}>
      <div className={style.webname}>Invent</div>
      <div className={style.navlinks}>
      
        <div className={style.linkstyle}><a onClick={scrolltohome} style={{ cursor: 'pointer'}}>Home</a></div>
        <div className={style.linkstyle}><a onClick={scrolltoproj} style={{ cursor: 'pointer'}}>Projects</a></div>
        <div className={style.linkstyle}><a onClick={scrollToHero4} style={{ cursor: 'pointer'}}>About Me</a></div>

      </div>
      </nav>



    {/*HERO 1 */}
    <section className={style.homehero1} > 
      <video autoPlay loop muted playsInline preload="auto"> <source src="/Invent/11.mp4" type="video/mp4" /></video>
        <div className={style.hero1intro1}>
          <h1><strong>Welcome to Invent</strong></h1>
          <p>Created with ReactJS Framework</p>
          <p>By Kent Quilao</p>
          </div>
        
    </section>
    {/*END HERO 1 */}

        {/*TITLE */}
    <section className={style.title} ref={titleref}>
      <div><h1>PROJECTS</h1></div>
    </section>

    {/*HERO 2 */}
    <section className={style.homehero2}> 
      <div className={style.hero2intro1}>
        <h1>Alumni System</h1>
        <p>Made with HTML, CSS, JavaScript, Php and MySQL</p>
        <p>By Kent Quilao</p>
        </div>
        <div className={style.hero2intro2}>
          <img src="/Invent/alumni.png"></img>
        </div>
    </section>
    {/*END HERO 2 */}

    {/*HERO 3 */}

    <section className={style.homehero3}>

       <div className={style.hero3intro2}>
        <img src="/Invent/Ace.png"></img>
      </div>

      <div className={style.hero3intro1}>
        <h1>Scholarship Submission Application</h1>
        <p>Made with HTML, CSS, JavaScript, Php and MySQL</p>
        <p>By Kent Quilao</p>
      </div>
      
    </section>
    {/*END HERO 3 */}

        {/*HERO 4 */}

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
          <div className={style.techimage}><img src="/Invent/react.png" className={style.img1}/></div>
          <div className={style.techimage}><img src="/Invent/laravel.png" className={style.img2}/></div>
          <div className={style.techimage}><img src="/Invent/html.png" className={style.img3}/></div>
          <div className={style.techimage}><img src="/Invent/css.png" className={style.img4}/></div>
          <div className={style.techimage}><img src="/Invent/javascript.png" className={style.img5}/></div>

          
          
          
          
          

        </div>
      </div>
      
    </section>
    {/*END HERO 4 */}

    <foooter className={style.homefooter}>
      <p>Invent 2026</p>
      <p>Made with ReactJS</p>
    </foooter>


    </div>
  );
}

export default Home;