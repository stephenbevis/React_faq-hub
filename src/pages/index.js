import React, { useState, useEffect } from 'react'

import '../../node_modules/bootstrap/dist/css/bootstrap.css'

// Components
import Header from '../components/Header'

// Data
import faqData from '../data/faqs.json'

const Home = () => {
    const [selectedFAQ, setSelectedFAQ] = useState('')
    const [searchedText, setSearchedText] = useState('')
    const [currentCategory, setCurrentCategory] = useState('All')
    const [displayedQuestions, setDisplayedQuestions] = useState(faqData)
    let questions = []

    // Set Featured Questions (Start)

    const featuredQuestions = []

    faqData.map(faq => {
        faq.featured && featuredQuestions.push(faq)
    })

    // Set Featured Questions (End)

    // Set Displayed Questions By Category (Start)

    const setCategory = (category) => {
        setSearchedText('')
        setCurrentCategory(category)

        if(category !== 'All'){
            faqData.map(faq => {
                faq.category === category && questions.push(faq)
            })

            setDisplayedQuestions(questions)
            questions = []
        } else {
            setDisplayedQuestions(faqData)
        }
    }

    // Set Displayed Questions By Category (End)

    // Scroll To Position (Start)

    const scrollTo = position => {
        setTimeout(setSelectedFAQ(''), 1000)

        window.scroll({
            top: position || 0,
	        behavior: "smooth"
        })
    }

    // Scroll To Position (End)

    // Highlight Searched Text (Start)

    const highlight = (fulltext, searchedText) => {
        return fulltext.replaceAll(new RegExp(searchedText, 'ig'), match => {
            return `<mark class="bg-danger text-white p-0">${match}</mark>`
        })
    }

    // Highlight Searched Text (End)

    // Filter FAQs (Start)

    const search = (searchedText) => {
        setSearchedText(searchedText)

        let matches = faqData.filter(faq => {
            const regex = new RegExp(searchedText, 'gi')
    
            let question, answer
    
            if(currentCategory !== 'All'){
                question = faq.category === currentCategory && faq.question.match(regex)
                answer = faq.category === currentCategory && faq.answer.match(regex)
            } else {
                question =  faq.question.match(regex)
                answer = faq.answer.match(regex)
            }
    
            return question || answer
        })

        setDisplayedQuestions(matches)
    }

    // Filter FAQs (End)

    return (
        <>
            <section className="container pt-5">
                {/* Search (Start) */}

                <div id="search" className="w-50 mb-5">
                    <label htmlFor="faqSearch" className="lead mb-3">Search By Category</label>

                    <div className="row border rounded-0 ms-0 py-2">
                        <div className="col-3">
                            <select name="category" id="searchCategory" className="border-0 w-100 py-2" style={{outline:"none", cursor:"pointer"}} onChange={e => {setCategory(e.target.value)}}>
                                <option value="All">All</option>
                                <option value="Category 1">Category 1</option>
                                <option value="Category 2">Category 2</option>
                                <option value="Category 3">Category 3</option>
                            </select>
                        </div>

                        <div className="col border-start">
                            <input id="faqSearch" type="text" value={searchedText} onInput={e => {search(e.target.value)}} placeholder="Search" className="d-block w-100 py-2 border-0" style={{outline:"none"}} />
                        </div>
                    </div>
                </div>

                {/* Search (End) */}

                {/* Featured Questions (Start) */}

                {currentCategory === 'All' && searchedText === '' && <div className="row w-75 mb-5">
                    <div className="col">
                        {featuredQuestions.map((faq, index) => (
                            index < featuredQuestions.length/2 && <a href={`#faq${faq.id}`} className="d-block mb-3 lead text-decoration-none" onClick={e => setSelectedFAQ(faq.id)}>{faq.question}</a>
                        ))}
                    </div>

                    <div className="col">
                        {featuredQuestions.map((faq, index) => (
                            index+1 > featuredQuestions.length/2 && <a href={`#faq${faq.id}`} className="d-block mb-3 lead text-decoration-none" onClick={e => setSelectedFAQ(faq.id)}>{faq.question}</a>
                        ))}
                    </div>
                </div>}

                {/* Featured Questions (End) */}
            </section>

            <section className="bg-dark text-white">
                <div className="container py-5">
                    <div className="display-6">Can't Find What You're Looking For? This is a demo... I'm sorry</div>
                </div>
            </section>

            <section className="container">
                {/* FAQs (Start) */}

                {displayedQuestions.map((faq, index) => (
                    <>  
                        {index === 0 ? <hr id={`faq${faq.id}`} className="visually-hidden-focusable" /> : <hr id={`faq${faq.id}`} /> }

                        <div className="my-5">
                            <div className="display-6 mb-3" dangerouslySetInnerHTML={{ __html: searchedText !== '' ? highlight(faq.question, searchedText) : faq.question}}></div>
                            <p className="lead" dangerouslySetInnerHTML={{ __html: searchedText !== '' ? highlight(faq.answer, searchedText) : faq.answer}}></p>

                            {selectedFAQ === faq.id && <div className="d-block lead mt-5 text-info" style={{cursor:"pointer"}} onClick={e => scrollTo()}>Return To FAQs</div>}
                        </div>
                    </>
                ))}

                {/* FAQs (End) */}
            </section>
        </>
    )
}

export default Home