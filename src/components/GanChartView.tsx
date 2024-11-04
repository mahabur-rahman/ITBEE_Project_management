import React, { useEffect } from "react";
import Gantt from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { projects } from "../data/data";
import { Link } from "react-router-dom";

const GanttChartView: React.FC = () => {
  useEffect(() => {
    Gantt.init("gantt_here");

    const tasks = {
      data: projects.flatMap((project) =>
        project.tasks.map((task) => ({
          id: `${project.id}-${task.id}`,
          text: task.name,
          start_date: project.startDate,
          end_date: project.endDate,
          progress: task.status === "Completed" ? 1 : 0,
        }))
      ),
    };

    Gantt.parse(tasks);

    return () => {
      Gantt.clearAll();
    };
  }, []);

  return (
    <div className="container p-12">
      <div>
        <Link to="/" className="p-4 text-black bg-gray-300 rounded-sm">
          Back to Home
        </Link>
        <h1 className="my-5 text-2xl font-bold text-center">Gantt Chart</h1>
      </div>
      <div id="gantt_here" style={{ width: "100%", height: "600px" }} />
    </div>
  );
};

export default GanttChartView;
