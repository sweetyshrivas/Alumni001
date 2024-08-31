import React, { useState, useEffect } from 'react';
import './FeedbackSurveysPage.css'; // Import CSS for styling

const FeedbackSurveysPage = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSurvey, setSelectedSurvey] = useState(null);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      // Simulating an API call to fetch feedback data
      try {
        // Replace with actual API call
        const response = await fetch('/api/feedback');
        const data = await response.json();
        setFeedbackData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
        setIsLoading(false);
      }
    };

    fetchFeedbackData();
  }, []);

  const handleSurveySelection = (survey) => {
    setSelectedSurvey(survey);
  };

  const renderSurveys = () => {
    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (feedbackData.length === 0) {
      return <p>No surveys available.</p>;
    }

    return feedbackData.map((survey) => (
      <div key={survey.id} className="survey-card" onClick={() => handleSurveySelection(survey)}>
        <h3>{survey.title}</h3>
        <p>{survey.description}</p>
        <button className="view-survey-btn">Take Survey</button>
      </div>
    ));
  };

  return (
    <div className="feedback-surveys">
      <h1>Feedback and Surveys</h1>
      <div className="surveys-list">
        {renderSurveys()}
      </div>
      {selectedSurvey && (
        <div className="survey-form-container">
          {/* Embed the Google Form iframe here */}
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSehLzmvp4bEqlKCPy8ila9LH-2HONFB-UC-eTvGT_Wq0tfA_A/viewform?embedded=true"
            width="640"
            height="382"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            className="survey-form"
          >
            Loading…
          </iframe>
        </div>
      )}
    </div>
  );
};

export default FeedbackSurveysPage;