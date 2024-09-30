const request = require('request');

const PasteeStyle = Object.freeze({
  Text: 'plain',
  Python: 'python',
  JavaScript: 'javascript',
  CSharp: 'csharp',
});

const PasteeExpiry = Object.freeze({
  Never: 'Never',
  OneHour: '1h',
  SixHours: '6h',
  TwelveHours: '12h',
  OneDay: '1d',
  OneWeek: '1w',
  TwoWeeks: '2w',
  OneMonth: '1m',
  ThreeMonths: '3m',
  SixMonths: '6m',
  OneYear: '1y',
});

class Pastee {
  constructor(key) {
    this.key = key || 'public';
  }

  submit({ name = '', description = '', pasteeexpiry = PasteeExpiry.OneWeek, pastelanguage = PasteeStyle.Text, content }) {
    if (!content) {
      throw new Error("Content is required");
    }

    const data = {
      expiry: pasteeexpiry,
      description: description || '',
      sections: [
        {
          name: name || 'Untitled',
          syntax: pastelanguage,
          contents: content
        }
      ]
    };

    return new Promise((resolve, reject) => {
      request.post({
        url: 'https://api.paste.ee/v1/pastes',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': this.key
        },
        body: JSON.stringify(data)
      }, (err, res, body) => {
        if (err) {
          reject(err);
        } else {
          try {
            const json = JSON.parse(body);
            if (json.link) {
              resolve({ Success: true, PasteeID: json.id, PasteeURL: json.link });
            } else {
              reject('Failed to create paste: ' + JSON.stringify(json));
            }
          } catch (error) {
            reject('Invalid JSON response: ' + body);
          }
        }
      });
    });
  }
}

module.exports = { Pastee, PasteeStyle, PasteeExpiry };
