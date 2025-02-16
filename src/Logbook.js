import React, { useState } from 'react';

const mockJumps = [
  {
    JumpNumber: 1,
    Date: '2023-10-01',
    JumpType: 'Tandem',
    Aircraft: 'Cessna 182',
    Altitude: 13000,
    PullAltitude: 5000,
    WindSpeedKnots: 10,
    Parachute: 'Safire 2',
    ParachuteSize: 190,
    Dropzone: 'Skydive Chicago',
    Description: 'First tandem jump!',
    SignedBy: 'John Doe',
    SignersLicenseNumber: '12345',
  },
  {
    JumpNumber: 2,
    Date: '2023-10-05',
    JumpType: 'Solo',
    Aircraft: 'Twin Otter',
    Altitude: 14000,
    PullAltitude: 3500,
    WindSpeedKnots: 15,
    Parachute: 'Pulse 190',
    ParachuteSize: 190,
    Dropzone: 'Skydive Perris',
    Description: 'First solo jump!',
    SignedBy: 'Jane Smith',
    SignersLicenseNumber: '67890',
  },
  {
    JumpNumber: 3,
    Date: '2023-10-01',
    JumpType: 'Tandem',
    Aircraft: 'Cessna 182',
    Altitude: 13000,
    PullAltitude: 5000,
    WindSpeedKnots: 10,
    Parachute: 'Safire 2',
    ParachuteSize: 190,
    Dropzone: 'Skydive Chicago',
    Description: 'First tandem jump!',
    SignedBy: 'John Doe',
    SignersLicenseNumber: '12345',
  },
  {
    JumpNumber: 4,
    Date: '2023-10-05',
    JumpType: 'Solo',
    Aircraft: 'Twin Otter',
    Altitude: 14000,
    PullAltitude: 3500,
    WindSpeedKnots: 15,
    Parachute: 'Pulse 190',
    ParachuteSize: 190,
    Dropzone: 'Skydive Perris',
    Description: 'First solo jump!',
    SignedBy: 'Jane Smith',
    SignersLicenseNumber: '67890',
  },
  {
    JumpNumber: 5,
    Date: '2023-10-01',
    JumpType: 'Tandem',
    Aircraft: 'Cessna 182',
    Altitude: 13000,
    PullAltitude: 5000,
    WindSpeedKnots: 10,
    Parachute: 'Safire 2',
    ParachuteSize: 190,
    Dropzone: 'Skydive Chicago',
    Description: 'First tandem jump!',
    SignedBy: 'John Doe',
    SignersLicenseNumber: '12345',
  },
  {
    JumpNumber: 6,
    Date: '2023-10-05',
    JumpType: 'Solo',
    Aircraft: 'Twin Otter',
    Altitude: 14000,
    PullAltitude: 3500,
    WindSpeedKnots: 15,
    Parachute: 'Pulse 190',
    ParachuteSize: 190,
    Dropzone: 'Skydive Perris',
    Description: 'First solo jump!',
    SignedBy: 'Jane Smith',
    SignersLicenseNumber: '67890',
  },
  {
    JumpNumber: 7,
    Date: '2023-10-01',
    JumpType: 'Tandem',
    Aircraft: 'Cessna 182',
    Altitude: 13000,
    PullAltitude: 5000,
    WindSpeedKnots: 10,
    Parachute: 'Safire 2',
    ParachuteSize: 190,
    Dropzone: 'Skydive Chicago',
    Description: 'First tandem jump!',
    SignedBy: 'John Doe',
    SignersLicenseNumber: '12345',
  },
  {
    JumpNumber: 8,
    Date: '2023-10-05',
    JumpType: 'Solo',
    Aircraft: 'Twin Otter',
    Altitude: 14000,
    PullAltitude: 3500,
    WindSpeedKnots: 15,
    Parachute: 'Pulse 190',
    ParachuteSize: 190,
    Dropzone: 'Skydive Perris',
    Description: 'First solo jump!',
    SignedBy: 'Jane Smith',
    SignersLicenseNumber: '67890',
  },
];

const Logbook = () => {
  const [selectedJump, setSelectedJump] = useState(null);

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <div style={{ flex: 1, borderRight: '1px solid #ccc', paddingRight: '20px', maxHeight: '70vh', overflowY: 'auto' }}>
        <h2>Jump Log</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, overflow: 'hidden' }}>
          {mockJumps.map((jump) => (
            <li
              key={jump.JumpNumber}
              style={{
                padding: '10px',
                marginBottom: '10px',
                backgroundColor: selectedJump?.JumpNumber === jump.JumpNumber ? '#f0f0f0' : '#fff',
                cursor: 'pointer',
                overflow: 'hidden',
                borderRadius: '4px',
              }}
              onClick={() => setSelectedJump(jump)}
            >
              <strong>Jump #{jump.JumpNumber}</strong> - {jump.Date} at {jump.Dropzone}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 2 }}>
        <h2>Jump Details</h2>
        {selectedJump ? (
          <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxHeight: '55vh', overflowY: 'auto' }}>
            <p><strong>Jump Number:</strong> {selectedJump.JumpNumber}</p>
            <p><strong>Date:</strong> {selectedJump.Date}</p>
            <p><strong>Jump Type:</strong> {selectedJump.JumpType}</p>
            <p><strong>Aircraft:</strong> {selectedJump.Aircraft}</p>
            <p><strong>Altitude:</strong> {selectedJump.Altitude} ft</p>
            <p><strong>Pull Altitude:</strong> {selectedJump.PullAltitude} ft</p>
            <p><strong>Wind Speed:</strong> {selectedJump.WindSpeedKnots} knots</p>
            <p><strong>Parachute:</strong> {selectedJump.Parachute}</p>
            <p><strong>Parachute Size:</strong> {selectedJump.ParachuteSize} sq ft</p>
            <p><strong>Dropzone:</strong> {selectedJump.Dropzone}</p>
            <p><strong>Description:</strong> {selectedJump.Description}</p>
            <p><strong>Signed By:</strong> {selectedJump.SignedBy}</p>
            <p><strong>Signer's License Number:</strong> {selectedJump.SignersLicenseNumber}</p>
          </div>
        ) : (
          <p>Select a jump to view details.</p>
        )}
      </div>
    </div>
  );
};

export default Logbook;