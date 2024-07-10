'use client';
import React, { useEffect, useState } from 'react';
import { templateData } from '@/constants/WFHemailTemplate';

const EmailGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('loginMail');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [additionalFields, setAdditionalFields] = useState({
    to: '',
    cc: '',
  });

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

  useEffect(() => {
    const WFH_email_to = localStorage.getItem('WFH_email_to') || '';
    const WFH_email_cc = localStorage.getItem('WFH_email_cc') || '';

    setAdditionalFields({
      to: WFH_email_to,
      cc: WFH_email_cc,
    });
  }, []);

  const handleEmailClick = () => {
    if (!additionalFields.to) {
      return;
    }

    localStorage.setItem('WFH_email_to', additionalFields.to);
    localStorage.setItem('WFH_email_cc', additionalFields.cc);

    const subject = emailSubject;
    const body = emailBody;

    const mailtoLink = `mailto:${additionalFields.to}?${
      additionalFields.cc ? `cc=${additionalFields.cc}&` : ''
    }subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <div
      className='hero min-h-screen bg-base-200'
      data-theme='night'>
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
              <div className='bg-primary/20 rounded-xl space-y-3 p-5 my-2'>
                <div className='textarea textarea-bordered'>
                  <p
                    className='font-small text-base-content'
                    dangerouslySetInnerHTML={{ __html: emailSubject }}
                  />
                </div>
                <div className='textarea textarea-bordered'>
                  <p
                    className='font-small text-base-content'
                    dangerouslySetInnerHTML={{ __html: emailBody.replace(/\n/g, '<br>') }}
                  />
                </div>
              </div>
              <button
                type='submit'
                className='btn'>
                {emailBody ? 're' : ''}generate Email
              </button>
              {emailBody ? (
                <button
                  type='button'
                  className='btn btn-success'
                  onClick={() => document.getElementById('my_modal_1').showModal()}>
                  Next
                </button>
              ) : null}
            </form>
            <dialog
              id='my_modal_1'
              className='modal modal-bottom sm:modal-middle'>
              <div className='modal-box'>
                <div className='space-y-4'>
                  <div className='form-control w-full'>
                    <div className='label'>
                      <span className='label-text'>To:</span>
                    </div>
                    <input
                      type='text'
                      placeholder='Type here'
                      value={additionalFields.to}
                      className='input input-bordered w-full'
                      onChange={(e) =>
                        setAdditionalFields((prevState) => ({
                          ...prevState,
                          to: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className='form-control w-full'>
                    <div className='label flex'>
                      <span className='label-text'>CC:</span>
                      <span className='badge badge-info'>Optional</span>
                    </div>
                    <input
                      type='text'
                      placeholder='Type here'
                      value={additionalFields.cc}
                      className='input input-bordered w-full'
                      onChange={(e) =>
                        setAdditionalFields((prevState) => ({
                          ...prevState,
                          cc: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className='modal-action'>
                  <div className='join flex w-full'>
                    <form
                      className='join-item flex-1'
                      method='dialog'>
                      <button className='btn w-full rounded-e-none'>Back</button>
                    </form>
                    <span
                      className='btn btn-primary join-item flex-1'
                      onClick={handleEmailClick}>
                      Send Email
                    </span>
                  </div>
                </div>
              </div>
              <form
                method='dialog'
                className='modal-backdrop'>
                <button>close</button>
              </form>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailGenerator;
