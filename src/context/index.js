import React, { Component } from "react";
import axios from 'axios';
import cookie from 'react-cookies';
import goodImage from '../image/good.webp';
import blurImage from '../image/blur.webp';
import hopeImage from '../image/hope.webp';
import heyImage from '../image/hey_hey.webp';
import teaImage from '../image/tea.webp';
import pressImage from '../image/press.webp';

import warningVoice from '../sound/warning.mp3';

import saveVoice from '../sound/saved.mp3';

import tuturuVoice from '../sound/tuturu.mp3';

import waitVoice from '../sound/please_wait.mp3';

import loadVoice from '../sound/load.mp3';





const MyContext = React.createContext();

class MyProvider extends Component {
    state = {
        signUpSpinner: false,
        registerMessage: 'Sign Up',
        loginMessage: 'Login',
        loginSpinner: false,
        loginImg: hopeImage,
        showNavbar: false,
        login: false,
        role: '',
        zone: '',
        sid: '',
        account: '',
        allUsers: [],
        removeId: '',
        navigateToAdmin: false,
        createUserBtn: true,
        file: '',
        fileName: '',
        uploadTitle: 'File Upload',
        uploadPercentage: 0,
        listPercentage: 0,
        stockData: [],
        listSearchBar: false,
        modalListEdit: false,
        selectedProduct: '',
        checkBoxEdit: false,
        navbarSpinner: false,
        addItemBtn: false,
        addItemAlert: '',
        addItemAlertDisplay: false,
        situation: {},
        inputImg: hopeImage,
        inputMsg: 'INVENTORY CHECK',
        inputSpinner: false,
        inputItem: '',
        soundSwitch: true,
        inputCheckbox: false,
        situationPercents: 0,
        pickCheckbox: false,
        volumeIcon: false,
        uploadStatus: false,
        getErrTimes: 0,
        uploadContent: 'When the "END" button is pressed, the stock counting will be end and the data will be stored.',
        uploadContenAbove: 'Finished your stock counting ',
        endTime: 60,
        timerRun: true,
        uploadImg: pressImage,
        historyData: '',
        historyDateList: true,
        historySingleList: false,
        historySingleId: '',
        historySingleData: '',
        historySingleDate: '',
        historySituation: {},
        soundFile: {
            warning: new Audio(warningVoice),
            save: new Audio(saveVoice),
            tuturu: new Audio(tuturuVoice),
            wait: new Audio(waitVoice),
            load: new Audio(loadVoice)
        },
        // backendLink: ''
        backendLink: 'https://earnest-reactor-366002.et.r.appspot.com/'


    }

    // const warning = new Audio(warningVoice);
    // const save = new Audio(saveVoice);
    // const tuturu = new Audio(tuturuVoice);
    // const wait = new Audio(waitVoice);
    // const load = new Audio(loadVoice);

    setSituationPercentsToZeroHandle = () => {
        this.setState({situationPercents: 0})
    }

    toHistoryMainHandle = () => {
        this.setState({
            historyDateList: true,
            historySingleList: false
        })
    }

    calculateHistoryDataHandle = () => {
        let data = this.state.historySingleData;
        let extra = 0;
        let short = 0;
        let anomaly = 0;
        let match = 0;
        let all = this.state.historySingleData.length;


        for (const obj of data) {
            let onHandQty = obj.onHandQty;
            let sysQty = obj.sysQty;
            let cal = onHandQty - sysQty;
            // console.log(cal)
            if (cal < 0) {
                short = short + 1;
            }
            if (cal > 0) {
                extra = extra + 1;
            }
            if (cal === 0) {
                match = match + 1
            }
            if (cal > 0 || cal < 0) {
                anomaly = anomaly + 1
            }
        }

        // let percent = Math.round((100 * match) / all);


        this.setState({ historySituation: { extra, short, anomaly, match, all } });
    }

    findSingleHistoryDataHandle = () => {
        this.setState({navbarSpinner: true})
        axios.post(`${this.state.backendLink}/api/history/singleData`, { zone: this.state.zone, id: this.state.historySingleId })
            .then(res => {
                // console.log(res.data)
                this.setState({ historySingleData: res.data.historySingleData.data[0].stock, historySingleDate: res.data.historySingleData.date });

            })
            .then(res => {
                this.calculateHistoryDataHandle();
                this.setState({navbarSpinner: false})

            })
            .catch(err => {
                console.log(err);
            })
    }

    setHistorySingleIdHandle = (id) => {
        this.setState({ historySingleId: id, historyDateList: false, historySingleList: true });
    }

    getZoneHistoryHandle = () => {
        // console.log('getZoneHistoryHandle');
        // console.log(this.state.zone, 'getZoneHistoryHandle')

        if (this.state.zone === '') {
            this.checkLoginHandle();
            setTimeout(() => {
                this.getZoneHistoryHandle();
            }, 1000)
        } else {
            axios.post(`${this.state.backendLink}/api/history`, { zone: this.state.zone })
                .then(res => {
                    // console.log(res.data);
                    this.setState({ historyData: res.data.historyData });
                })
                .catch(err => {
                    console.log(err);
                })
        }


    }

    controlTimerHandle = (onOff) => {
        if (onOff === 'on') {

            this.runEndTimeHandle();
            this.setState({
                uploadContenAbove: 'Are you sure you want to end your stock counting?',
                uploadImg: teaImage
            })
            // this.setState({timerRun: false});
        }
        if (onOff === 'off') {
            this.setState({ timerRun: false });
            setTimeout(() => {
                this.setState({
                    timerRun: true,
                    endTime: 60,
                    uploadContenAbove: 'Finished counting your stock',
                    uploadImg: pressImage
                });
                this.setUploadContentHandle('When the "END" button is pressed, the stock counting will be end and the data will be stored.');
            }, 1000)
        }
    }

    stockDataSaveToHistory = () => {
        let time = new Date().getTime();
        let date = new Date().toString();
        let zone = this.state.zone;

        axios.post(`${this.state.backendLink}/api/upload/save`, { time, date, zone })
            .then(res => {
                this.setState({ uploadStatus: true })
            })
            .catch(err => {
                console.log(err);
            })
    }

    runEndTimeHandle = () => {

        if (this.state.endTime > 0 && this.state.timerRun) {
            setTimeout(() => {
                this.setState({ endTime: this.state.endTime - 1 })
                this.runEndTimeHandle();
                this.setUploadContentHandle(`If you do nothing, the computer will end stock counting in ${this.state.endTime} seconds and stocktaking data will be stored.`)
                if (this.state.endTime <= 0) {
                    this.stockDataSaveToHistory();
                }
            }, 1000)
        }

    }

    setUploadContentHandle = (content) => {
        this.setState({ uploadContent: content });
    }

    volumeControlHandle = () => {
        this.setState({ soundSwitch: !this.state.soundSwitch });
        setTimeout(() => {
            document.querySelector('.navbar-toggler').click();
        }, 1000)
    }

    setVolumeIconHandle = (switchBtn) => {
        if (switchBtn === 'show') {
            this.setState({ volumeIcon: true });
        }
        if (switchBtn === 'hidden') {
            this.setState({ volumeIcon: false });
        }
    }

    autoPickHandle = () => {
        const anomalyArr = [];

        this.state.stockData.forEach(obj => {
            let cal = obj.onHandQty - obj.sysQty;
            if (cal !== 0) {
                anomalyArr.push(obj);
            }
        })

        let randomNum = Math.floor(Math.random() * anomalyArr.length);

        this.setState({ inputItem: anomalyArr[randomNum] });
        this.setInputEanHandle(anomalyArr[randomNum].ean);
    }

    setPickCheckboxHandle = () => {
        if (this.state.pickCheckbox === false) {
            this.autoPickHandle();
        }
        this.setState({ pickCheckbox: !this.state.pickCheckbox, inputCheckbox: false });
    }

    setInputCheckboxHandle = () => {
        this.setState({ inputCheckbox: !this.state.inputCheckbox, pickCheckbox: false })
    }

    soundControlHandle = (msg) => {
        if (this.state.soundSwitch) {
            // const warning = new Audio(warningVoice);
            // const save = new Audio(saveVoice);
            // const tuturu = new Audio(tuturuVoice);
            // const wait = new Audio(waitVoice);
            // const load = new Audio(loadVoice);


            if (msg === 'warning') {
                this.state.soundFile.wait.play();
                // wait.play();
            }
            if (msg === 'save') {
                this.state.soundFile.save.play();
                // save.play();
            }
            if (msg === 'match') {
                this.state.soundFile.tuturu.play();
                // tuturu.play();
            }
            if (msg === 'extra') {
                this.state.soundFile.warning.play();
                // warning.play();
            }
            if (msg === 'load') {
                this.state.soundFile.load.play();
                // load.play();
            }
        }
    }

    setInputImgHandle = (img) => {
        this.setState({ inputImg: img })
    }

    setInputMsgHandle = (msg) => {
        this.setState({ inputMsg: msg })
    }

    setInputItemHandle = (item) => {
        this.setState({ inputItem: item })
    }

    setInputErrImgHandle = () => {
        this.setState({ inputImg: hopeImage });
    }

    setInputEanHandle = (ean) => {
        this.setState({ inputMsg: ean, inputImg: `https://www.phco.my/images/thumbs/products/${ean}/0.jpg` })
    }

    submitQuantityHandle = (qty) => {

        if (this.state.inputCheckbox) {
            this.soundControlHandle('load');
        } else {
            this.setState({ inputSpinner: true });
        }

        axios.post(`${this.state.backendLink}/api/input`, { item: this.state.inputItem, qty: qty, sid: this.state.sid, account: this.state.account })
            .then(res => {
                // console.log(res.data);

                let onHandQty = res.data.item.onHandQty;
                let sysQty = res.data.item.sysQty;
                this.setState({ inputItem: res.data.item, inputSpinner: false });

                if (!this.state.inputCheckbox) {
                    if (onHandQty === sysQty) {
                        this.soundControlHandle('match');
                    } else if (onHandQty > sysQty) {
                        this.soundControlHandle('extra');
                    } else {
                        this.soundControlHandle('save');
                    }
                }
            })
            .then(res => {
                this.getZoneStockDataHandle();
            })
            .catch(err => {
                console.log(err);
            })
    }

    calculateStockDataHandle = () => {
        let data = this.state.stockData;
        let extra = 0;
        let short = 0;
        let anomaly = 0;
        let match = 0;
        let all = this.state.stockData.length;


        for (const obj of data) {
            let onHandQty = obj.onHandQty;
            let sysQty = obj.sysQty;
            let cal = onHandQty - sysQty;
            // console.log(cal)
            if (cal < 0) {
                short = short + 1;
            }
            if (cal > 0) {
                extra = extra + 1;
            }
            if (cal === 0) {
                match = match + 1
            }
            if (cal > 0 || cal < 0) {
                anomaly = anomaly + 1
            }
        }

        let percent = Math.round((100 * match) / all);


        this.setState({ situation: { extra, short, anomaly, match, all }, situationPercents: percent });
    }




    addItemHandle = (ean, product, found) => {

        this.setState({ navbarSpinner: true });

        const filterSameEan = (eanCode) => {
            let sameEan = this.state.stockData.find(obj => obj.ean === eanCode);
            return sameEan;
        }

        if (filterSameEan(ean) === undefined) {

            let zone = this.state.zone;
            axios.patch(`${this.state.backendLink}/api/list/edit`, { ean, product, found, zone })
                .then(res => {
                    // console.log(res.data);
                    this.setState({ navbarSpinner: false });
                })
                .then(res => {
                    this.getZoneStockDataHandle();
                })
                .catch(err => {
                    console.error();
                })
        } else {
            this.setState({
                navbarSpinner: false,
                addItemAlert: 'The new item ean code cannot be the same',
                addItemAlertDisplay: true
            });

            setTimeout(() => {
                this.setState({ addItemAlert: '', addItemAlertDisplay: false });
            }, 5000)

        }


    }

    addItemOnHandle = () => {
        this.setState({ addItemBtn: true });
    }

    addItemOffHandle = () => {
        this.setState({ addItemBtn: false });
    }

    handleCheckBoxEdit = () => {
        this.setState({ checkBoxEdit: !this.state.checkBoxEdit })
    };

    editModalAddHandle = (qty, resetQty, account, sid = this.state.sid) => {


        let product = this.state.selectedProduct;
        axios.post(`${this.state.backendLink}/api/list/edit`, { product, qty, resetQty, account, sid })
            .then(res => {
                // console.log(res.data);
                this.setState({ checkBoxEdit: false });
            })
            .then(res => {
                this.getZoneStockDataHandle();
                this.closeModal();
            })
            .catch(err => {
                console.log({ message: 'errors', errors: err });
            })
    }

    setSelectedProductHandle = (id) => {
        let product = this.state.stockData.find(obj => obj._id === id);
        // console.log(product)
        this.setState({ selectedProduct: product });
   
    }

    setListSearchBarHandle = (status) => {
        if (status === 'on') {
            this.setState({ listSearchBar: true, modalListEdit: true })
        } else if (status === 'off') {
            this.setState({ listSearchBar: false, modalListEdit: false })
        }

    }

    getZoneStockDataHandle = () => {
        this.setState({ navbarSpinner: true });


        axios.post(`${this.state.backendLink}/api/list`, { zone: this.state.zone })
            .then(res => {
                this.setState({ stockData: res.data.stockData.stock, getErrTimes: 0 })
            })
            .then(res => {
                this.setState({ navbarSpinner: false });
            })
            .then(res => {
                this.calculateStockDataHandle();
            })
            .catch(err => {
                console.log(err);
                this.setState({ getErrTimes: this.state.getErrTimes + 1, pickCheckbox: false, inputCheckbox: false });
                if (this.state.getErrTimes > 10) {
                    this.setState({navbarSpinner: false});
                    return;
                }
                setTimeout(() => {
                    this.getZoneStockDataHandle();
                }, 1000)
            })
    }

    setUploadTitleHandle = (title) => {
        this.setState({ uploadTitle: title });
        setTimeout(() => {
            this.setState({ uploadTitle: 'File Upload', file: '', fileName: '' });
        }, 5000)
    }

    checkExistingZoneDataHandle = (zone) => {
        axios.post(`${this.state.backendLink}/api/upload/findData`, { zone })
            .then(res => {
                if (res.data.zoneData.length === 0) {
                    this.setState({ uploadStatus: true });
                } else {
                    this.setState({ uploadStatus: false });
                }
                // console.log(res.data.zoneData)
            })
            .catch(err => { console.err() })
    }

    submitFileHandle = (formData) => {

        axios.post(`${this.state.backendLink}/api/upload`, formData, {
            onUploadProgress: ProgressEvent => {
                this.setState({ uploadPercentage: parseInt(Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)) })
            }
        })
            .then(res => {
                // console.log(res.data);
                if (res.data.msg === 'error') {
                    this.setUploadTitleHandle(`${res.data.fileName} upload Errors....😅 `);
                    // this.setState({ uploadStatus: true });

                    setTimeout(() => {
                        this.setState({ uploadPercentage: 0 })

                    }, 1000)
                    return;
                }
                if(!res.data.fileName) {
                    this.setUploadTitleHandle(`Upload Errors...`);
                    setTimeout(() => {
                        this.setState({ uploadPercentage: 0 })
                    }, 1000)
                    setTimeout(() => {
                        this.setState({ uploadStatus: true });
                    }, 5000)
                } else {
                    this.setUploadTitleHandle(`${res.data.fileName} upload success 😚.`);
                    setTimeout(() => {
                        this.setState({ uploadPercentage: 0 })
                    }, 1000)
                    setTimeout(() => {
                        this.setState({ uploadStatus: false });
                    }, 5000)
                }
               

                // console.log(res.data)
                // setTimeout(() => {
                //     this.setState({ uploadPercentage: 0 })
                // }, 1000)
                // setTimeout(() => {
                //     this.setState({ uploadStatus: false });
                // }, 5000)
            })
            // .then(res => {
            //     setTimeout(() => {
            //         this.setState({ uploadStatus: false });

            //     }, 5000)
            // })
            .catch(err => {
                this.setUploadTitleHandle(`Upload Errors...`);
                console.log(err);
            });
    }

    setFileHandle = (file) => {
        this.setState({ file })
    }

    setFileNameHandle = (fileName) => {
        this.setState({ fileName });
    }

    toggleNavigateToAdminHandle = () => {
        this.setState({ navigateToAdmin: !this.navigateToAdmin });
    }

    setRemoveIdHandle = (id) => {
        this.setState({ removeId: id, loginMessage: 'Delete user account must login again', loginImg: heyImage, createUserBtn: false });
        setTimeout(() => {
            this.setState({ loginMessage: 'Login', loginImg: hopeImage })
        }, 4000)
    }

    removeUserHandle = () => {
        axios.delete(`${this.state.backendLink}/api/auth/admin`, { data: { id: this.state.removeId } })
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log({ message: 'removeUserHandle failed', errors: err });
            })
    }

    updateZoneNRoleHandle = (id, zone, role) => {
        axios.patch(`${this.state.backendLink}/api/auth/admin`, { id, zone, role })
            .then(res => {
                this.checkLoginHandle();
                this.calculateStockDataHandle();
                // console.log(res.data);
            })
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err)
            })
    }

    getAllUsersHandle = () => {
        // console.log('getAllUsersHandle');
        axios.get(`${this.state.backendLink}/api/auth/admin`)
            .then(res => {
                // console.log(res.data);
                this.setState({ allUsers: res.data });

                res.data.forEach(obj => {
                    document.getElementById(obj._id).value = obj.zone;
                    document.getElementById(obj.sid).value = obj.role;
                });
            })
            .catch(err => {
                console.log({
                    message: 'getAllUsersHandle errors',
                    errors: err
                })
            })
    }

  checkLoginHandle = (cb) => {

        let cookieName = 'auth';
        let cookieToken;

        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }

        cookieToken = getCookie(cookieName);

        axios.post(`${this.state.backendLink}/api/auth/verify`, { cookieName, cookieToken })
            .then(res => {
                console.log(res.data);
                this.setState({ role: res.data.role, zone: res.data.zone, account: res.data.account, login: res.data.login, sid: res.data.sid });

                if (res.data.login === false || res.data.role === 'newbie') {
                    this.logoutHandle();
                    cb();
                }
                this.checkExistingZoneDataHandle(res.data.zone);
            })
            .catch(err => {
                console.log(err);
                this.logoutHandle();
                cb();
            })
    }

    checkAdminLoginHandle = (cb) => {
        // console.log('checkAdminLoginHandle')
        axios.get(`${this.state.backendLink}/api/auth/verify`)
            .then(res => {
                // console.log(res.data);
                this.setState({ role: res.data.role, zone: res.data.zone, account: res.data.account, login: res.data.login });
                this.checkExistingZoneDataHandle(res.data.zone);
                if (res.data.login === false || res.data.role !== 'admin') {
                    this.logoutHandle();
                    cb();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    logoutHandle = () => {
        // console.log('logoutHandle')
        this.setState({ login: false, role: '' });
        cookie.remove('auth', { path: '/' });
    }

    // notReadyAutoLogoutHandle = () => {
    //     if(this.state.role === 'user' && this.state.uploadStatus === true) {
    //         this.loginHandle();
    //     }
    // }



     loginHandle = (sid, password) => {
        this.setState({ loginSpinner: true, loginMessage: 'Loading...' })
        axios.post(`${this.state.backendLink}/api/auth/login`, { sid, password })
            .then(res => {
                this.setState({ loginSpinner: false })
                console.log(res.data);
                let message = res.data.message;
                let role = res.data.role;

                if(message === 'login success') {
                    let nameCookie = res.data.cookie_.name;
                    let tokenCookie = res.data.cookie_.token;
                    document.cookie = `${nameCookie}=${tokenCookie}`;
                }

                if (message === 'login failed') {
                    this.setState({ loginMessage: `We couldn't find an account matching`, loginImg: blurImage, removeId: '', navigateToAdmin: false })
                    setTimeout(() => {
                        this.setState({ loginMessage: 'Login', loginImg: hopeImage });
                    }, 4000)
                } else if (role === 'newbie') {
                    this.setState({ loginMessage: `Your account is currently not active.`, loginImg: blurImage, removeId: '', navigateToAdmin: false });
                    setTimeout(() => {
                        this.setState({ loginMessage: 'Login', loginImg: hopeImage });
                    }, 4000)
                } else if (role === 'user' || role === 'admin') {



                    if (this.state.removeId !== '' && role === 'admin') {
                        this.removeUserHandle();
                        this.setState({ removeId: '', navigateToAdmin: true });

                    } else {
                        this.setState({ removeId: '', navigateToAdmin: false });
                    }

                    this.setState({
                        loginMessage: 'Login',
                        loginImg: goodImage,
                        showNavbar: true,
                        login: true
                    });

                    setTimeout(() => {
                        this.setState({ loginImg: hopeImage })
                    }, 2000)
                }

            })
            .then(res => {
                this.setState({ createUserBtn: true });
            })
            .catch(err => {
                console.log(err);
                this.setState({ loginSpinner: false })
            })
    }

    registerHandle = (account, password, sid, zone) => {
        this.setState({ signUpSpinner: true });
        axios.post(`${this.state.backendLink}/api/auth/register`, { account, password, sid, zone })
            .then(res => {
                // console.log(res.data);
                this.setState({ signUpSpinner: false });
                let message = res.data.message;
                if (message === 'register failed') {
                    console.log('register failed')
                    this.setState({ registerMessage: 'Unable to process your registration request.' })
                    setTimeout(() => {
                        this.setState({ registerMessage: 'Sign Up' })
                    }, 5000)
                } else {
                    this.setState({ registerMessage: 'Registration success.' })
                    setTimeout(() => {
                        this.setState({ registerMessage: 'Sign Up' })
                        this.closeModal();
                    }, 2000)
                }

            })
            .catch(err => {
                console.log(err);

            })
    }

    closeModal = () => {
        document.querySelector('.modal-btn-close').click();
    }

    render() {
        return (
            <MyContext.Provider
                value={{
                    state: this.state,
                    register: this.registerHandle,
                    login: this.loginHandle,
                    logout: this.logoutHandle,
                    checkLogin: this.checkLoginHandle,
                    getAllUsers: this.getAllUsersHandle,
                    updateZoneNRole: this.updateZoneNRoleHandle,
                    setRemoveId: this.setRemoveIdHandle,
                    toggleNavigateToAdmin: this.toggleNavigateToAdminHandle,
                    checkAdminLogin: this.checkAdminLoginHandle,
                    setFile: this.setFileHandle,
                    setFileName: this.setFileNameHandle,
                    submitFile: this.submitFileHandle,
                    setUploadTitle: this.setUploadTitleHandle,
                    getZoneStockData: this.getZoneStockDataHandle,
                    setListSearchBar: this.setListSearchBarHandle,
                    editRenderData: this.editRenderDataHandle,
                    setSelectedProduct: this.setSelectedProductHandle,
                    editModalAdd: this.editModalAddHandle,
                    CheckBoxEdit: this.handleCheckBoxEdit,
                    close_Modal: this.closeModal,
                    addItemOn: this.addItemOnHandle,
                    addItemOff: this.addItemOffHandle,
                    addItem: this.addItemHandle,
                    submitQuantity: this.submitQuantityHandle,
                    setInputEan: this.setInputEanHandle,
                    setInputErrImg: this.setInputErrImgHandle,
                    setInputItem: this.setInputItemHandle,
                    setInputMsg: this.setInputMsgHandle,
                    setInputImg: this.setInputImgHandle,
                    soundControl: this.soundControlHandle,
                    setInputCheckbox: this.setInputCheckboxHandle,
                    setPickCheckbox: this.setPickCheckboxHandle,
                    autoPick: this.autoPickHandle,
                    setVolumeIcon: this.setVolumeIconHandle,
                    volumeControl: this.volumeControlHandle,
                    checkExistingZoneData: this.checkExistingZoneDataHandle,
                    notReadyAutoLogout: this.notReadyAutoLogoutHandle,
                    setUploadContent: this.setUploadContentHandle,
                    runEndTime: this.runEndTimeHandle,
                    controlTimer: this.controlTimerHandle,
                    getZoneHistory: this.getZoneHistoryHandle,
                    setHistorySingleId: this.setHistorySingleIdHandle,
                    findSingleHistoryData: this.findSingleHistoryDataHandle,
                    toHistoryMain: this.toHistoryMainHandle,
                    setSituationPercentsToZero: this.setSituationPercentsToZeroHandle



                }}
            >
                {this.props.children}
            </MyContext.Provider>
        )
    }
}

export { MyContext, MyProvider };
