import React, { useReducer, useState } from 'react';
import Header from './components/header/header';
import Menu from './components/menu/menu';
import Modal from './components/modal/modal';
import Table from './components/table/table';
import './index.css'
import { TableColumns, TableData } from './interface/table.interface';
import { demoContext, demoReducer, dispatchMiddleware } from './redux/reduce';
import { initialState } from './redux/state';
function App() {
    const [state, dispatch] = useReducer(demoReducer, initialState);
    const middleDispatch = dispatchMiddleware(dispatch);
    const [deleteId, setDeleteId] = useState<number>(0)
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const [formValue, setFormValue] = useState<TableData>({ key: null, name: '', age: "" })
    const [showFormModal, setShowFormModal] = useState<boolean>(false)
    const columns: Array<TableColumns> = [
        {
            title: '姓名',
            dataIndex: 'name'
        },
        {
            title: '年龄',
            dataIndex: 'age'
        },
        {
            title: '操作',
            dataIndex: 'option',
            render: (record: TableData) =>
                <>
                    <button key={`del-${record.key}`} onClick={() => clickDeleteButton(record)}>
                        删除
                    </button>
                    <button key={`edit-${record.key}`} onClick={() => clickEditButton(record)}>
                        编辑
                    </button>
                </>
        }
    ]

    const clickDeleteButton = (record: TableData) => {
        setDeleteId(record.key!);
        setShowDeleteModal(true);
    }

    const clickEditButton = (record: TableData) => {
        setFormValue(record);
        setShowFormModal(true);
    }

    const clickAddButton = () => {
        setFormValue({ key: null, name: '', age: "" });
        setShowFormModal(true);
    }

    const confirmDelete = () => {
        const copyDataSource: Array<TableData> = JSON.parse(JSON.stringify(state.demoTableDataSource));
        const findIndex = copyDataSource.findIndex(x => x.key === deleteId);
        if (findIndex !== -1) {
            copyDataSource.splice(findIndex, 1);
            dispatch({ type: 'UpdateState', update: { demoTableDataSource: copyDataSource } });
            cancelDelete();
        }
    }

    const cancelDelete = () => {
        setShowDeleteModal(false);
        setDeleteId(0);
    }

    const cancelFormModal = () => {
        setShowFormModal(false);
        setFormValue({ key: null, name: '', age: '' });
    }

    const confrimForm = async () => {
        const validRes = await validForm()
        const copyFormValue = JSON.parse(JSON.stringify(formValue));
        const copyDemoTableDataSource: Array<TableData> = JSON.parse(JSON.stringify(state.demoTableDataSource));
        if (validRes) {
            if (formValue.key) {
                const findEditIndex = copyDemoTableDataSource.findIndex(item => item.key === formValue.key);
                if (findEditIndex > 0) {
                    copyDemoTableDataSource[findEditIndex] = { ...copyDemoTableDataSource[findEditIndex], ...formValue }
                }
            } else {
                copyFormValue.key = Math.max.apply(Math, copyDemoTableDataSource.map(item => item.key!)) + 1;
                copyDemoTableDataSource.push(copyFormValue);
            }
            dispatch({ type: 'UpdateState', update: { demoTableDataSource: copyDemoTableDataSource } });
            cancelFormModal();
        }
    }

    const changeFormValue = (field: string, value: string) => {
        setFormValue({ ...formValue, [field]: value });
    }

    const setErrorFor = (input: any, message: string) => {
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        formControl.className = 'form-control error';
        small.innerText = message;
    }

    const setSuccessFor = (input: any) => {
        const formControl = input.parentElement;
        const small = formControl.querySelector('small');
        formControl.className = 'form-control success';
        small.innerText = "错误信息";
    }

    const validForm = () => {
        if (formValue.name === "") {
            setErrorFor(document.getElementById('name'), '姓名不可为空');
        } else {
            setSuccessFor(document.getElementById('name'));
        }
        if (formValue.age === "") {
            setErrorFor(document.getElementById('age'), '年龄不可为空');
        } else {
            setSuccessFor(document.getElementById('age'));
        }
        return new Promise((resolve, reject) => {
            if (formValue.name && formValue.age) {
                resolve(true);
            } else {
                reject(false);
            }
        })
    }

    return (
        <div className="app">
            <demoContext.Provider value={{ state, dispatch: middleDispatch }}>
                <Menu menuData={state.menuData} />
                <div className='content'>
                    <Header />
                    <Table<TableData> columns={columns} dataSource={state.demoTableDataSource} header={<button onClick={clickAddButton}>添加</button>} />
                </div>
            </demoContext.Provider>
            <Modal visible={showDeleteModal} onOk={confirmDelete} onCancel={cancelDelete}>
                <div>是否确认删除？</div>
            </Modal>
            <Modal visible={showFormModal} onOk={confrimForm} onCancel={cancelFormModal}>
                <div className="form" >
                    <div className="form-control">
                        <label>姓名</label>
                        <input
                            id="name"
                            value={formValue.name}
                            placeholder="输入姓名"
                            onChange={(e) => changeFormValue('name', e.target.value)}
                        />
                        <small>错误信息</small>
                    </div>
                    <div className="form-control">
                        <label >年龄</label>
                        <input
                            id="age"
                            type="number"
                            value={formValue.age}
                            placeholder="输入年龄"
                            onChange={(e) => changeFormValue('age', e.target.value)}
                        />
                        <small>错误信息</small>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default App;
