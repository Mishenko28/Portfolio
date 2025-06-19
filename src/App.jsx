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
    const [isDraggedNavs, setIsDraggedNavs] = useState(false)
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
    }, [])

    const scrollTo = (i) => {
        pages.current[i].scrollIntoView({
            behavior: 'smooth'
        })
    }

    const applyStyle = (i) => {
        return currentPage === i ? { color: "#fff" } : null
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

    return (
        <div className='app'>
            <div className="slider">
                <motion.div
                    whileDrag={{ cursor: "grabbing", scale: 1.1 }}
                    onDragEnd={() => setIsDraggedNavs(true)}
                    drag
                    dragMomentum={false}
                    dragConstraints={{ left: -window.innerWidth + 130, right: 0, top: -window.innerHeight / 2 + 120, bottom: window.innerHeight / 2 - 120 }}
                    className="icons"
                >
                    <h6 style={isDraggedNavs ? { color: "transparent", backgroundColor: "#002aff3b", marginLeft: 0 } : null}>drag me</h6>
                    <div className="bttns">
                        <i style={applyStyle(0)} onClick={() => scrollTo(0)} className="fa-solid fa-house" />
                        <i style={applyStyle(1)} onClick={() => scrollTo(1)} className="fa-solid fa-address-card" />
                        <i style={applyStyle(2)} onClick={() => scrollTo(2)} className="fa-solid fa-code" />
                        <i style={applyStyle(3)} onClick={() => scrollTo(3)} className="fa-solid fa-layer-group" />
                        <i style={applyStyle(4)} onClick={() => scrollTo(4)} className="fa-solid fa-phone" />
                    </div>
                </motion.div>
            </div>
            <div className="cont-1" ref={e => pages.current[0] = e}>
                <h1>Hi, I am <b onClick={handleAnimateClick}>{name}<span style={!isAnimating ? { animation: "blink 1.2s ease-in-out infinite" } : null}>|</span>{!isPointed && <i className="fa-regular fa-hand-pointer" />}</b></h1>
                <div>
                    <h2>Welcome to my portfolio</h2>
                    <p>
                        I am a Full  Stack Developer with a passion for creating innovative solutions.
                    </p>
                    <p>
                        I specialize in building responsive and user-friendly web applications using modern technologies.
                    </p>
                    <p>
                        Feel free to reach out if you would like to collaborate!
                    </p>
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
                        {
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
                <h1>My Work</h1>
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
                        <h2>THESIS</h2>
                        <h3>"The Lagoon Resort Finland Inc. Website with online Booking System"</h3>
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
                        <h2>SOFTWARE ENGINEERING</h2>
                        <h3>"Website for Cyfres Beach Resort"</h3>
                        <a target="_blank" href="https://cyfres-beach-resort.onrender.com">https://cyfres-beach-resort.onrender.com</a>
                    </div>
                </div>
            </div>
            <div className="cont-5" ref={e => pages.current[4] = e}>
                <h1>Contacts</h1>
                <p>in developing...</p>
            </div>
        </div >
    )
}

export default App