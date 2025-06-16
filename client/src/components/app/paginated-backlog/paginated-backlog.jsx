import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "./pagination/pagination";
import { Backlog } from "./backlog/Backlog";
import { getTasksForBacklog } from "../../../queries/getTasksForBacklog";
import { getLabels } from "../../../queries/getLabels";
import { getStatuses } from "../../../queries/getStatuses";
import { TaskModal } from "../board/TaskModal";

export function PaginatedBacklog({ projectSlug }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [backlog, setBacklog] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [labels, setLabels] = useState();
  const [statuses, setStatuses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null)

  function handlePageChanged(pageNumber) {
    setCurrentPage(pageNumber);
  }

  function handleSizeChanged(pageSize) {
    setPageSize(pageSize);
  }

  const {
    isPending,
    isError,
    error,
    data: responseData,
  } = useQuery({
    queryKey: ["backlog", { currentPage, pageSize }],
    queryFn: () => getTasksForBacklog(projectSlug, currentPage, pageSize),
  });

  useEffect(() => {
    getLabels().then(setLabels)
    getStatuses().then(setStatuses)
    if (responseData) {
      if (currentPage > responseData.meta.pagination.pageCount) {
        setCurrentPage(responseData.meta.pagination.pageCount);
      }
      setBacklog(responseData.data);
      setPageCount(responseData.meta.pagination.pageCount);
    }
  }, [responseData, currentPage]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  async function refreshTasks() {
    const updated = await getTasksForBacklog(projectSlug, currentPage, pageSize);
    setBacklog(updated.data)
    setShowModal(false)
    setSelectedTask(null)
  }

  console.log(statuses);


  return (<>
    <div className="container">
      <Backlog backlog={backlog} onTaskClick={(task) => { setSelectedTask(task); setShowModal(true) }} />
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        pageSize={pageSize}
        onPageChanged={handlePageChanged}
        onSizeChanged={handleSizeChanged}
      />
    </div>
    {
      showModal && <TaskModal className={(showModal) ? "is-active" : ""} project={backlog[0].project} task={selectedTask} states={statuses.data} labels={labels} onClose={() => setShowModal(false)} onUpdate={refreshTasks} onDelete={refreshTasks} />
    }
  </>
  );
}
