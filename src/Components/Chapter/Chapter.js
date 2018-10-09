import React from 'react';
import { NavLink } from 'react-router-dom';

const Chapter = ({chapter, chId}) => {
    const hStyle = {
        textAlign: 'center',
    }

    return(
        <div>
            <div id={chId} style={{maxHeight:'80%', height: '80%',}} className="modal open blue modal-fixed-footer">
                <div className="modal-content white-text">
                <h6 style={hStyle}>Chapter {chapter.chapter_number}.</h6>
                <h3 style={hStyle}>{chapter.name}</h3>
                <h5 style={hStyle}>{chapter.name_transliterated} - {chapter.name_translation}</h5>
                <h6><b>Number of verses : {chapter.verses_count}</b></h6>
                <h6>Summary : </h6>
                <p>{chapter.chapter_summary}</p>
                </div>
                <div className="modal-footer">
                <NavLink to={`/gita/verses/${chapter.chapter_number}`} className='waves-effect waves-green btn-flat'>Read More</NavLink>
                <a href="#!" className="modal-close waves-effect waves-blue btn-flat">Close</a>
                </div>
            </div>
        </div>
    );
};

export default Chapter;

