import React from 'react';

const TaskProgressCircle = ({ completedTasks, totalTasks, isDarkMode }) => {
  const calculateSegments = () => {
    if (totalTasks === 0) return [0, 0];
    const completedAngle = (completedTasks / totalTasks) * 360;
    const pendingAngle = 360 - completedAngle;
    return [completedAngle, pendingAngle];
  };

  const [completedAngle, pendingAngle] = calculateSegments();

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  // Theme-aware colors
  const colors = {
    pending: isDarkMode ? '#347136' : '#22c55e',
    completed: isDarkMode ? '#74ab77' : '#4ade80',
    text: isDarkMode ? 'text-gray-300' : 'text-gray-700',
    legend: isDarkMode ? 'text-gray-400' : 'text-gray-500'
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Pending segment */}
          {pendingAngle > 0 && (
            <path
              d={describeArc(50, 50, 40, 0, pendingAngle)}
              fill="none"
              stroke={colors.pending}
              strokeWidth="12"
              strokeLinecap="round"
            />
          )}
          
          {/* Completed segment */}
          {completedAngle > 0 && (
            <path
              d={describeArc(50, 50, 40, pendingAngle, 360)}
              fill="none"
              stroke={colors.completed}
              strokeWidth="12"
              strokeLinecap="round"
            />
          )}
          
          {/* Inner circle */}
          <circle
            cx="50"
            cy="50"
            r="30"
            fill="transparent"
          />
        </svg>
        
        {/* Counter text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${colors.text}`}>
            {totalTasks}
          </span>
        </div>
      </div>
      
      {/* Legend */}
      <div className={`flex gap-2 text-xs ${colors.legend} mt-2`}>
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.pending }}></div>
          Pending
        </span>
        <span className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.completed }}></div>
          Done
        </span>
      </div>
    </div>
  );
};

export default TaskProgressCircle;