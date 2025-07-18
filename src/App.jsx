import { useEffect, useRef, useState } from "react"
import animateName from "./hooks/useAnimateName"
import { CodeBlock, sunburst } from 'react-code-blocks'
import { AnimatePresence, motion } from "framer-motion"

import HTML from "./assets/logos/HTML.png"
import CSS from "./assets/logos/CSS.jpg"
import Js from "./assets/logos/Js.png"
import ReactJS from "./assets/logos/reactJs.png"
import NodeJS from "./assets/logos/nodeJs.png"
import ExpressJS from "./assets/logos/express-js.png"
import MongoDB from "./assets/logos/mongoDB.png"

const imageNames = [
    {
        name: "HTML",
        path: HTML
    },
    {
        name: "CSS",
        path: CSS
    },
    {
        name: "JavaScript",
        path: Js
    },
    {
        name: "React.js",
        path: ReactJS
    },
    {
        name: "Node.js",
        path: NodeJS
    },
    {
        name: "Express.js",
        path: ExpressJS
    },
    {
        name: "MongoDB",
        path: MongoDB
    }
]

const App = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const pages = useRef([])
    const { name, isAnimating, erase, write } = animateName({ text: "JOHN THOMAS ALOG", speedMili: 40 })
    const [isPointed, setIsPointed] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setCurrentPage(pages.current.indexOf(entry.target))
                }
            })
        }, { threshold: 0.6 })

        pages.current.forEach(page => {
            observer.observe(page)
        })

        return () => {
            observer.disconnect()
        }
    }, [])

    useEffect(() => {
        write()
        changeColorTheme()
    }, [])

    const changeColorTheme = () => {
        const randomColors = [
            {
                primaryDark: "#0061ff",
                primaryLight: "#60efff"
            },
            {
                primaryDark: "#00ff87",
                primaryLight: "#60efff"
            },
            {
                primaryDark: "#40c9ff",
                primaryLight: "#e81cff"
            },
            {
                primaryDark: "#ff930f",
                primaryLight: "#fff95b"
            },
            {
                primaryDark: "#696eff",
                primaryLight: "#f8acff"
            },
            {
                primaryDark: "#103783",
                primaryLight: "#9bafd9"
            },
            {
                primaryDark: "#42047e",
                primaryLight: "#07f49e"
            },
            {
                primaryDark: "#d3321d",
                primaryLight: "#ffcf67"
            },
            {
                primaryDark: "#34073d",
                primaryLight: "#ef745c"
            }
        ]
        const currentPrimaryDark = getComputedStyle(document.documentElement).getPropertyValue('--primary-dark').trim()

        const randomIndex = Math.floor(Math.random() * randomColors.length)
        const { primaryDark, primaryLight } = randomColors[randomIndex]

        if (primaryDark === currentPrimaryDark) {
            return changeColorTheme()
        }

        document.documentElement.style.setProperty('--primary-dark', primaryDark)
        document.documentElement.style.setProperty('--primary-light', primaryLight)
    }

    const scrollTo = (i) => {
        pages.current[i].scrollIntoView({
            behavior: 'smooth'
        })
    }

    const applyStyle = (i) => {
        return currentPage === i ? { color: "var(--text)" } : null
    }

    const handleAnimateClick = async () => {
        setIsPointed(true)
        erase().then(() => {
            write()
        })
    }

    // SKILL IMAGES
    const [skillImages, setSkillImages] = useState([])
    const [isRenderedOnce, setIsRenderedOnce] = useState(false)
    const addSkillImage = async () => {
        console.log("first")
        if (isRenderedOnce) return
        setIsRenderedOnce(true)
        for (const name of imageNames) {
            await new Promise(res => {
                setTimeout(() => {
                    setSkillImages(prev => [name, ...prev])
                    res()
                }, 500)
            })
        }
    }
    const clickImage = (skill) => {
        setSkillImages(prev => prev.filter(item => item.name !== skill.name))
        setTimeout(() => {
            setSkillImages(prev => [skill, ...prev])
        }, 800)
    }

    // TOGGLE DARK AND LIGHT MODE
    const toggleDarkMode = (isLight) => {
        if (isLight) {
            document.documentElement.setAttribute('data-theme', 'light')
        } else {
            document.documentElement.setAttribute('data-theme', 'dark')
        }
    }

    return (
        <div className='app'>
            <motion.div
                whileDrag={{ cursor: "grabbing", scale: 1.1 }}
                drag
                dragMomentum={false}
                dragConstraints={{ left: -window.innerWidth + 130, right: 0, top: -window.innerHeight / 2 + 120, bottom: window.innerHeight / 2 - 120 }}
                className="slider"
            >
                <i style={applyStyle(0)} onClick={() => scrollTo(0)} className="fa-solid fa-house" />
                <i style={applyStyle(1)} onClick={() => scrollTo(1)} className="fa-solid fa-address-card" />
                <i style={applyStyle(2)} onClick={() => scrollTo(2)} className="fa-solid fa-code" />
                <i style={applyStyle(3)} onClick={() => scrollTo(3)} className="fa-solid fa-layer-group" />
                <i style={applyStyle(4)} onClick={() => scrollTo(4)} className="fa-solid fa-phone" />
            </motion.div>
            <div className="top-bttns">
                <i class="fa-solid fa-paint-roller" onClick={changeColorTheme} />
                <div class="toggle">
                    <input id="toggle-switch" type="checkbox" onChange={e => toggleDarkMode(e.target.checked)} />
                    <label for="toggle-switch"></label>
                </div>
            </div>
            <div className="cont-1" ref={e => pages.current[0] = e}>
                <h1>Hello, I'm <b onClick={handleAnimateClick}>{name}<span style={!isAnimating ? { animation: "blink 1.2s ease-in-out infinite" } : null}>|</span>{!isPointed && <i className="fa-regular fa-hand-pointer" />}</b></h1>
                <div>
                    <h2>And i'm a Full Stack Developer</h2>
                    <p>
                        I specialize in building responsive and user-friendly web applications using modern technologies.
                    </p>
                    <p>
                        Feel free to reach out if you would like to collaborate!
                    </p>
                    <div className="socials">
                        <a href="https://facebook.com/johnthomas.alog" target="_blank"><i className="fa-brands fa-square-facebook icon" /></a>
                        <a href="https://www.instagram.com/jtmishenko" target="_blank"><i className="fa-brands fa-square-instagram icon" /></a>
                        <a href="mailto:johnthomasalog@gmail.com" target="_blank"><i className="fa-solid fa-square-envelope icon" /></a>
                        <a href="https://github.com/Mishenko28" target="_blank"><i className="fa-brands fa-square-github icon" /></a>
                        <a href="RESUME2025.pdf" download="john_thomas_alog_CV.pdf" className="cv">
                            Download CV
                            <i className="fa-solid fa-download" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="cont-2" ref={e => pages.current[1] = e}>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    transition={{ duration: 0.5 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <CodeBlock
                        text={`
                        personalInfo:   {
                                    fullName: "John Thomas Tolentino Alog",
                                    age: ${Math.floor((new Date() - new Date("2000-12-28")) / (1000 * 60 * 60 * 24 * 365.25))},
                                    gender: "Male"
                                    nationality: "Filipino",
                                    location: "Olongapo City, Philippines",
                                    profession: "Junior Full Stack Web Developer",
                                    hobbies: ["Coding", "Gaming", "Music"],
                                    education: {
                                            degree: "Bachelor of Science in Computer Science",
                                            institution: "Kolehiyo ng Subic",
                                            graduationYear: 2025
                                }
                        }
                    `}
                        language="javascript"
                        theme={sunburst}
                        showLineNumbers={false}
                        customStyle={{ fontSize: "clamp(0.6rem, 1.5vw, 1.2rem)" }}
                    />
                </motion.div>
            </div>
            <div className="cont-3" ref={e => pages.current[2] = e}>
                <h1>
                    <b><i className="fa-solid fa-angle-left" /></b>
                    <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: "max-content" }}
                        transition={{ duration: 2, type: "spring", bounce: 0.4 }}
                        viewport={{ once: false, amount: 1 }}
                    >CodingSkills</motion.span>
                    <b>/<i className="fa-solid fa-angle-right" /></b>
                </h1>
                <motion.div viewport={{ amount: 1 }} onViewportEnter={addSkillImage} className="skills">
                    <AnimatePresence mode="popLayout">
                        {skillImages.map(skill => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, rotate: 180, scale: 0.2 }}
                                transition={{ duration: 1, type: "spring", bounce: 0.5 }}
                                key={skill.name}
                                className="skill"
                            >
                                <motion.img
                                    whileHover={{ scale: 0.8, rotate: 10 }}
                                    onClick={() => clickImage(skill)}
                                    src={skill.path}
                                    alt={skill.name}
                                />
                                <p>{skill.name}</p>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
            <div className="cont-4" ref={e => pages.current[3] = e}>
                <h1>Recent Projects</h1>
                <div className="works-cont">
                    <div className="work">
                        <motion.iframe
                            src="https://the-lagoon-resort-finland-inc.onrender.com/"
                            title="Live Project Preview"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                            viewport={{ once: true, amount: 0.5 }}
                        ></motion.iframe>
                        <h2>WEBSITE</h2>
                        <h3>"The Lagoon Resort Finland Inc. Website with online Booking System" (Thesis Subject)</h3>
                        <a target="_blank" href="https://the-lagoon-resort-finland-inc.onrender.com">https://the-lagoon-resort-finland-inc.onrender.com</a>
                    </div>
                    <div className="work">
                        <motion.iframe
                            src="https://cyfres-beach-resort.onrender.com/"
                            title="Live Project Preview"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                            viewport={{ once: true, amount: 0.5 }}
                        ></motion.iframe>
                        <h2>WEBSITE</h2>
                        <h3>"Website for Cyfres Beach Resort" (Software Engineering Subject)</h3>
                        <a target="_blank" href="https://cyfres-beach-resort.onrender.com">https://cyfres-beach-resort.onrender.com</a>
                    </div>
                </div>
            </div>
            <div className="cont-5" ref={e => pages.current[4] = e}>
                <div className="contacts">
                    <h1>My Social Accounts</h1>
                    <div className="contact">
                        <i className="fa-brands fa-square-facebook icon" />
                        <div className="contact-text">
                            <h2>Facebook</h2>
                            <div className="link">
                                <p>https://facebook.com/johnthomas.alog</p>
                                <a href="https://facebook.com/johnthomas.alog" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="contact">
                        <i className="fa-brands fa-square-instagram icon" />
                        <div className="contact-text">
                            <h2>Instagram</h2>
                            <div className="link">
                                <p>https://www.instagram.com/jtmishenko</p>
                                <a href="https://www.instagram.com/jtmishenko" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="contact">
                        <i className="fa-solid fa-square-envelope icon" />
                        <div className="contact-text">
                            <h2>Email</h2>
                            <div className="link">
                                <p>johnthomasalog@gmail.com</p>
                                <a href="mailto:johnthomasalog@gmail.com" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square" /></a>
                            </div>
                        </div>
                    </div>
                    <div className="contact">
                        <i className="fa-brands fa-square-github icon" />
                        <div className="contact-text">
                            <h2>Github</h2>
                            <div className="link">
                                <p>https://github.com/Mishenko28</p>
                                <a href="https://github.com/Mishenko28" target="_blank"><i class="fa-solid fa-arrow-up-right-from-square" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <div className="footer-text">
                    <p>© {new Date().getFullYear()} John Thomas Alog. All rights reserved.</p>
                    <p>Made using React.js</p>
                </div>
            </footer>
        </div >
    )
}

export default App