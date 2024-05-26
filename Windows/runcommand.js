document.addEventListener('DOMContentLoaded', () => {

    const favoris_data = {
        "regedit": "Registry Editor",
        "services.msc": "Windows Services (local)",
        "taskmgr": "Task Manager",
        "mstsc": "Remote Desktop (Microsoft Terminal Services Client)",
        "wf.msc": "Windows Firewall with Advanced Security",
        "msinfo32": "System Information",
        "winver": "Windows Version (Check your Windows version)",
        "appwiz.cpl": "Application Wizard (Program and Features)",
        "control": "Control Panel",
        "ncpa.cpl": "Network Properties",
        "eventvwr.msc": "Event Viewer",
        "gpedit.msc": "Group Policy Editor",
        "lusrmgr.msc": "Local User and Groups",
    };

    const Common_Windows_Tools_data = {
        "explorer": "Windows Explorer",
        "c:": "Open C: Drive",
        "regedit": "Registry Editor",
        "services.msc": "Windows Services (local)",
        "taskmgr": "Task Manager",
        "msconfig": "System Configuration Utility",
        "mstsc": "Remote Desktop (Microsoft Terminal Services Client)",
        "logoff": "Log Off Windows (without confirmation!)",
        "shutdown": "Shuts Down Windows (Save all your work first)",
        "cmd": "Command Prompt",
        "notepad": "Notepad",
        "osk": "On Screen keyboard",
        "mailto:": "Open Default Mail Application",
        "Website address": "Open entered URL in default browser"
    };

    const Other_Windows_Tools_Utilities_data = {
        "calc": "Calculator",
        "chkdsk": "Check Disk",
        "charmap": "Character Map",
        "cleanmgr": "Clean Manager - Disk Cleanup Utility",
        "clipbrd": "Clipboard Viewer (not available after Windows XP)",
        "comp": "Compare Files",
        "colorcpl": "Color Management",
        "cttune": "ClearType Text tuner",
        "dxdiag": "Direct X Troubleshooter",
        "eudcedit": "Private Characters Editor",
        "fonts": "Fonts",
        "fsquirt": "Bluetooth Transfer Wizard",
        "ftp": "MS-DOS FTP",
        "iexplore": "Internet Explorer",
        "joy.cpl": "Game Controllers",
        "label": "Volume Serial Number for C:",
        "magnify": "Windows Magnifier",
        "microsoft-edge://": "Edge",
        "migwiz": "Migration Wizard - Files and Settings Transfer Tool",
        "mip": "Math Input Panel",
        "mrt": "Malicious Software Removal Tool",
        "msiexec": "Windows Installer Details",
        "msinfo32": "System Information",
        "mspaint": "Paint",
        "narrator": "Narrator",
        "powershell": "Powershell",
        "shrpubw": "Create a shared folder Wizard",
        "sigverif": "File Signature Verification Tool",
        "sndvol": "Volume Control",
        "snippingtool": "Snipping Tools",
        "stikynot": "Sticky Notes",
        "utilman": "Narrator Settings",
        "verifier": "Driver Verifier Utility",
        "was": "Contacts",
        "wf.msc": "Windows Firewall with Advanced Security",
        "wfs": "Windows Fax and Scan",
        "wiaacmgr": "Scanner",
        "winver": "Windows Version (Check your Windows version)",
        "wmplayer": "Windows Media Player",
        "write": "WordPad",
        "xpsrchvw": "XPS Viewer",
        "winword": "Word",
        "Word /safe": "Word Safe Mode",
    };

    const Control_Panel_Commands_data = {
        "appwiz.cpl": "Application Wizard (Program and Features)",
        "control": "Control Panel",
        "control admintools": "Administrative Tools",
        "control color": "Personalization - Color and Appearance",
        "control desktop": "Display Properties (Personalization)",
        "control folders": "Folders Properties",
        "control keyboard": "Keyboard Properties",
        "control mouse": "Mouse Properties",
        "control netconnections": "Network Properties",
        "control printers": "Printers Folders",
        "control schedtasks": "Scheduled Tasks",
        "control update": "Windows Update",
        "control userpasswords": "Manager current User Account",
        "control userpasswords2": "Manager all User Accounts",
        "desk.cpl": "Display - Screen Resolution",
        "devmgmt.msc": "Device Manager",
        "firewall.cpl": "Windows Firewall",
        "inetcpl.cpl": "Internet Properties (Internet Control Panel)",
        "intl.cpl": "Regional Settings (International)",
        "mmsys.cpl": "Sound Properties (Multimedia System Settings)",
        "ncpa.cpl": "Network Properties",
        "netplwiz": "To create User Account",
        "powercfg.cpl": "Power Configuration",
        "sysdm.cpl": "System Properties",
        "timedate.cpl": "Date and Time Properties",
        "utilman": "Ease of Access Utility Manager",
        "wscui.cpl": "Security Center (Windows Security Center UI)"
    };

    const Windows_Administrative_Tools_data = {
        "compmgmt.msc": "Computer Management including System Tools, Storage, Services and Applications",
        "defrag": "Defrag Command",
        "dcomcnfg": "Component Services (Detailed Component Configuration)",
        "diskmgmt.msc": "Disk Partition Manager",
        "diskpart": "Diskpart Command",
        "eventvwr.msc": "Event Viewer",
        "fsmgmt.msc": "Shared Folders (File Sharing Management)",
        "gpedit.msc": "Group Policy Editor",
        "lusrmgr.msc": "Local User and Groups",
        "perfmon.msc": "Performance Monitor",
        "rekeywiz": "File Encryption",
    };

    const System_File_Checker_Utility_data = {
        "sfc /scannow": "System File Checker Utility (Scan Immediately)",
        "sfc /scanonce": "System File Checker Utility (Scan Once At Next Boot)",
        "sfc /scanboot": "System File Checker Utility (Scan On Every Boot)",
        "sfc /revert": "System File Checker Utility (Return to Default Settings)",
        "sfc /purgecache": "System File Checker Utility (Purge File Cache)",
        "sfc /cachesize=x": "System File Checker Utility (Set Cache Size to Size x)"
    };

    const Common_Environment_Variables_data = {
        "%AllUsersProfile%": "Program Data",
        "%ProgramFiles%": "Program Files",
        "%SystemDrive%": "System Drive",
        "%SystemRoot%": "System Root",
        "%Temp%": "Temporary Folder",
        "%UserProfile%": "User Profile",
        "%WinDir%": "Windows Directory"
    };    

    const list_data = {
        "Favoris": favoris_data,
        "Common_Windows_Tools": Common_Windows_Tools_data,
        "Other_Windows_Tools_Utilities": Other_Windows_Tools_Utilities_data,
        "Control_Panel_Commands": Other_Windows_Tools_Utilities_data,
        "Windows_Administrative_Tools": Windows_Administrative_Tools_data,
        "System_File_Checker_Utility": System_File_Checker_Utility_data, 
        "Common_Environment_Variables": Common_Environment_Variables_data
    };

    for (const [key1, value1] of Object.entries(list_data)) {
        tableBody = document.getElementById(key1 + "-table").getElementsByTagName('tbody')[0];
        for (const [key2, value2] of Object.entries(value1)) {
            const row = document.createElement('tr');
    
            const cellKey = document.createElement('td');
            cellKey.textContent = key2;
            row.appendChild(cellKey);
    
            const cellValue = document.createElement('td');
            cellValue.textContent = value2;
            row.appendChild(cellValue);
    
            tableBody.appendChild(row);
        }
    }
    
});
