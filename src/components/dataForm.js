import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import React, { useRef, useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import Select from "@material-ui/core/Select";
function DataForm() {
  const [teacher, setTeacher] = useState("");
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState("");
  const [subject, setSubject] = useState("");
  const [classes, setClasses] = useState([]);
  const [updateTitle, setUpdateTitle] = useState([]);
  const [updateVal, setUpdateVal] = useState([]);
  const [updateType, setUpdateType] = useState([]);
  const [deleteVal, setDelete] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [id, setID] = useState("");
  const [classNum, setClassNum] = useState("");
  const [classTitle, setClassTitle] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openU, setOpenU] = React.useState(false);
  const [openD, setOpenD] = React.useState(false);
  const [typeList, setTypeList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [idList, setIDList] = useState([]);
  const [selectMode, setSelectMode] = useState(false);
  const [studentIDs, setStudentIDs] = useState([]);
  const [forum, setForum] = useState([]);
  const darkBlue = "#004981";
  const lightBlue = "#6ea8d4";
  const baseButtonStyle = {
    backgroundColor: darkBlue,
    borderWidth: "0px",
    fontWeight: "bold",
    color: "white",
  };
  const selectButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: selectMode ? lightBlue : darkBlue,
  };

  const InputStyle = {
    backgroundColor: "#E5E5E5",
    borderRadius: "10px",
    padding: "5px",
  };
  const handleClickOpen = () => {
    if (forum.length === 0) {
      fetchForum();
    }
    setOpen(true);
  };
  const handleClickOpenU = () => {
    if (typeList.length === 0) {
      typeList.push("Teacher");
      typeList.push("Subject");
      typeList.push("Start");
      typeList.push("End");
      typeList.push("ID");
      typeList.push("Classroom");
      typeList.push("Title");
    }
    fetchIDS();

    setOpenU(true);
  };
  const handleClickOpenD = () => {
    fetchIDS();
    setOpenD(true);
  };
  const handleClose = () => {
    setOpen(false);
    //  fetchIDS();
  };
  const handleCloseU = () => {
    setOpenU(false);
    fetchIDS();
  };
  const handleCloseD = () => {
    setOpenD(false);
    fetchIDS();
  };
  const handleChange = (e) => {
    setTeacher(e.currentTarget.value);
  };

  const handleChangeStart = (e) => {
    setStart(e.currentTarget.value);
  };
  const handleChangeEnd = (e) => {
    setEnd(e.currentTarget.value);
  };
  const handleChangeUpdate = (e) => {
    setUpdateTitle(e.currentTarget.value);
  };
  const handleChangeType = (e) => {
    setUpdateType(e.currentTarget.value);
  };
  const handleChangeUpdateVal = (e) => {
    setUpdateVal(e.currentTarget.value);
  };
  const handleChangeSubject = (e) => {
    setSubject(e.currentTarget.value);
  };
  const handleChangeStudents = (e) => {
    setStudents(e);
  };
  const handleChangeDelete = (e) => {
    setDelete(e.currentTarget.value);
  };
  const handleChangeStudent = (e) => {
    setStudent(e.currentTarget.value);
  };
  const handleChangeClassTitle = (e) => {
    setClassTitle(e.currentTarget.value);
  };
  const handleChangeID = (e) => {
    setID(e.currentTarget.value);
  };
  const handleChangeClassNum = (e) => {
    setClassNum(e.currentTarget.value);
  };
  const addStudent = () => {
    console.log(student);
    students.push(student);
    //fetchStudents();
    console.log(studentList);
    for (var i = 0; i < studentList.length; i++) {
      if (studentList[i].name === student) {
        studentIDs.push(studentList[i].id);
        console.log(studentIDs);
      }
    }
  };
  const addTeacher = (val) => {
    setTeacher(val);
  };
  const fetchForum = () => {
    fetch(`http://localhost:8080/forum/read`)
      .then((res) => res.json())
      .then((data) => setForum(data));
    console.log(forum);
  };
  const fetchTeachers = () => {
    fetch(`http://localhost:8080/teachers/read`)
      .then((res) => res.json())
      .then((data) => setTeacherList(data));
  };
  const fetchClasses = () => {
    fetch(`http://localhost:8080/classes/read`)
      .then((res) => res.json())
      .then((data) => setClasses(data));
    console.log(classes);
  };
  const fetchIDS = () => {
    fetchClasses();
    var list = [];
    console.log(classes);
    for (var i = 0; i < classes.length; i++) list.push(classes[i].ID);
    setIDList(list);
  };
  const fetchSubjects = () => {
    var subs = [
      "Science",
      "Math",
      "Art",
      "History",
      "English",
      "Health",
      "Geography",
      "Music",
    ];
    setSubjectList(subs);
  };
  const createClasses = (
    teacher,
    subject,
    students,
    start,
    end,
    id,
    classNum,
    classTitle,
    studentIDs
  ) => {
    var val = {
      Teacher: teacher,
      Subject: subject,
      Students: students,
      Start: start,
      End: end,
      ID: id,
      Classroom: classNum,
      Title: classTitle,
      StudentIDs: studentIDs,
    };

    var data = JSON.stringify(val);
    //var string = val.toString();
    // console.log(string);
    //console.log(data);
    fetch(`http://localhost:8080/forum/add`, {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => console.log(result));

    setTeacher("");
    setStart("");
    setEnd("");
    setSubject("");
    setStudents([]);
    setID("");
    setClassNum("");
    setClassTitle("");
    // setClasses(classes);
  };

  const deleteClass = (e) => {
    var id = deleteVal;

    // e.prClassesDefault();
    for (var i = 0; i < classes.length; i++) {
      if (
        typeof classes[i].items != "undefined" &&
        classes[i].title === deleteVal
      ) {
        id = classes[i].id;
      }
    }

    // console.log(id);
    fetch(`http://localhost:8080/classes/delete/${deleteVal}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: id }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setDelete("");
  };
  const updateClasses = (e) => {
    var id = "";
    // e.prClassesDefault();
    for (var i = 0; i < classes.length; i++) {
      if (
        typeof classes[i].items != "undefined" &&
        classes[i].title === updateTitle
      ) {
        id = classes[i].id;
      }
    }

    fetch(`http://localhost:8080/classes/update/${updateTitle}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: updateTitle,
        type: updateType,
        val: updateVal,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setUpdateTitle("");
    setUpdateType("");
    setUpdateVal("");
  };

  return (
    <div>
      <Button style={baseButtonStyle} onClick={handleClickOpen}>
        Display Forum
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form>
          Students:
          {forum.map((c) => (
            <p>{c.postDetails}</p>
          ))}
        </form>
      </Dialog>
      <Button style={baseButtonStyle} onClick={handleClickOpenU}>
        Update Class
      </Button>
      <Dialog
        open={openU}
        onClose={handleCloseU}
        aria-labelledby="form-dialog-title"
      >
        <form>
          ID:
          <Select style={selectButtonStyle} onChange={handleChangeUpdate}>
            {idList.map((id) => {
              return <option value={id}> {id} </option>;
            })}
          </Select>
          Type:
          <Select style={selectButtonStyle} onChange={handleChangeType}>
            {typeList.map((type) => {
              return <option value={type}> {type} </option>;
            })}
          </Select>
          <Input
            style={InputStyle}
            name="newVal"
            placeholder="What should it be set to?"
            value={updateVal}
            onChange={handleChangeUpdateVal}
          />
          <Button style={baseButtonStyle} onClick={() => updateClasses()}>
            Update Class
          </Button>
        </form>
      </Dialog>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button style={baseButtonStyle} onClick={handleClickOpenD}>
        Delete Class
      </Button>
      <Dialog
        open={openD}
        onClose={handleCloseD}
        aria-labelledby="form-dialog-title"
      >
        <form>
          ID:
          <Select style={selectButtonStyle} onChange={handleChangeDelete}>
            {idList.map((id) => {
              return <option value={id}> {id} </option>;
            })}
          </Select>
          <Button style={baseButtonStyle} onClick={() => deleteClass()}>
            Delete Class
          </Button>
        </form>
      </Dialog>
    </div>
  );
}

export default DataForm;
