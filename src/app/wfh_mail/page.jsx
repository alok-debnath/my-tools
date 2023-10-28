'use client';
import React, { useState } from 'react';
import { templateData } from '@/constants/WFHemailTemplate';

const EmailGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('loginMail');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const [additionalTime, setAdditionalTime] = useState(0);

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

    const currentTime = new Date();

    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    currentTime.setMinutes(minutes + additionalTime);

    const time = currentTime.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const formattedDate = date.replace(/(\d+)\/(\d+)\/(\d+)/, '$2/$1/$3');

    const modifiedEmailBody = template.body
      .replace('{time}', time)
      .replace('{additionalTime}', additionalTime);

    setEmailSubject(template.subject.replace('{date}', formattedDate).replace('{time}', time));
    setEmailBody(modifiedEmailBody);
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
              <div className='grid grid-cols-3 gap-4 place-content-between'>
                <input
                  type='radio'
                  aria-label='0'
                  name='extraTime'
                  className='btn'
                  onClick={() => {
                    setAdditionalTime(0);
                  }}
                />
                <input
                  type='radio'
                  aria-label='+1'
                  name='extraTime'
                  className='btn'
                  onClick={() => {
                    setAdditionalTime(1);
                  }}
                />
                <input
                  type='radio'
                  aria-label='+2'
                  name='extraTime'
                  className='btn'
                  onClick={() => {
                    setAdditionalTime(2);
                  }}
                />
              </div>
              <div className='mockup-code mb-3 mt-2'>
                <div className='px-5'>
                  <div
                    className='textarea textarea-bordered'
                    dangerouslySetInnerHTML={{ __html: emailSubject }}
                  />
                  <div
                    className='textarea textarea-bordered'
                    dangerouslySetInnerHTML={{ __html: emailBody }}
                  />
                </div>
              </div>
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
