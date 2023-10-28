'use client';
import React, { useState } from 'react';
import { templateData } from '@/constants/WFHemailTemplate';

const EmailGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('loginMail');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const templateOptions = Object.keys(templateData);

  const handleTemplateChange = (event) => {
    setSelectedTemplate(event.target.value);
  };

  const generateEmail = (e) => {
    e.preventDefault();
    const template = templateData[selectedTemplate];

    const date = new Date().toLocaleString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    const time = new Date().toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const formattedDate = date.replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3');

    setEmailSubject(template.subject.replace('{date}', formattedDate).replace('{time}', time));
    setEmailBody(template.body.replace('{time}', time));
  };

  return (
    <div className='hero min-h-screen bg-base-200'>
      <div className='hero-content'>
        <div className='max-w-md'>
          <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
            <form
              className='card-body'
              onSubmit={generateEmail}>
              <select
                className='select select-bordered w-full max-w-xs'
                onChange={handleTemplateChange}
                value={selectedTemplate}>
                {templateOptions.map((templateKey) => (
                  <option
                    key={templateKey}
                    value={templateKey}>
                    {templateData[templateKey].name}
                  </option>
                ))}
              </select>
              <div
                className='textarea textarea-bordered'
                dangerouslySetInnerHTML={{ __html: emailSubject }}
              />
              <div
                className='textarea textarea-bordered'
                dangerouslySetInnerHTML={{ __html: emailBody }}
              />
              <button
                type='submit'
                className='btn'>
                Regenerate Email
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailGenerator;
