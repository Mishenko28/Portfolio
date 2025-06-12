import { useState } from "react"

const useAnimateName = ({ text, speedMili }) => {
    const [isAnimating, setIsAnimating] = useState(false)
    const [name, setName] = useState(text)

    const write = async () => {
        if (isAnimating) return false
        setIsAnimating(true)
        setName("")

        await new Promise(res => setTimeout(() => res(), 400))

        for (const letter of name) {
            await new Promise(resolve => {
                setTimeout(() => {
                    setName(prev => prev + letter)
                    resolve()
                }, letter === " " ? speedMili * 5 : speedMili)
            })
        }

        await new Promise(res => setTimeout(() => res(), 500))
        setIsAnimating(false)
        return true
    }

    const erase = async () => {
        if (isAnimating) return false
        setIsAnimating(true)
        for (const letter of name) {
            await new Promise(resolve => {
                setTimeout(() => {
                    setName(prev => prev.slice(0, -1))
                    resolve()
                }, speedMili)
            })
        }
        setIsAnimating(false)
        return true
    }

    return { write, erase, name, isAnimating }
}

export default useAnimateName