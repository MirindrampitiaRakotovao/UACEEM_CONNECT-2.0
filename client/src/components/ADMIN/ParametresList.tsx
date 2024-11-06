import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext.tsx';
import {
    Settings,
    User,
    Bell,
    Shield,
    Layout,
    Moon,
    Languages,
    HelpCircle,
    Mail,
    Key,
    Toggle,
    Smartphone,
    Eye,
    Info,
    ChevronRight,
    Lock,
    Type
} from 'lucide-react';

const ParametresList = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();
    const [activeSection, setActiveSection] = useState('profile');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    const settingsSections = [
        {
            id: 'profile',
            label: 'Profil',
            icon: User,
            description: 'Gérez vos informations personnelles',
            settings: [
                {
                    id: 'personal-info',
                    label: 'Informations personnelles',
                    description: 'Gérer vos informations personnelles',
                    icon: Info
                },
                {
                    id: 'email',
                    label: 'Email et contact',
                    description: 'Gérer vos coordonnees',
                    icon: Mail
                },
                {
                    id: 'password',
                    label: 'Mot de passe',
                    description: 'Modifier votre mot de passe',
                    icon: Key
                }
            ]
        },
        {
            id: 'security',
            label: 'Sécurité',
            icon: Lock,
            description: 'Paramètres de sécurité et authentification',
            settings: [
                {
                    id: '2fa',
                    label: 'Double authentification',
                    description: 'Activer la double authentification',
                    icon: Shield,
                    toggle: true
                },
                {
                    id: 'devices',
                    label: 'Appareils connectés',
                    description: 'Gérer les appareils connectés',
                    icon: Smartphone
                }
            ]
        },
        {
            id: 'notifications',
            label: 'Notifications',
            icon: Bell,
            description: 'Gérez vos préférences de notifications',
            settings: [
                {
                    id: 'push',
                    label: 'Notifications push',
                    description: 'Gérer les notifications push',
                    icon: Smartphone,
                    toggle: true
                },
                {
                    id: 'email-notif',
                    label: 'Notifications par email',
                    description: 'Gérer les notifications par email',
                    icon: Mail,
                    toggle: true
                }
            ]
        },
        {
            id: 'privacy',
            label: 'Confidentialité',
            icon: Shield,
            description: 'Contrôlez votre confidentialité',
            settings: [
                {
                    id: 'visibility',
                    label: 'Visibilité du profil',
                    description: 'Gérer qui peut voir votre profil',
                    icon: Eye,
                    toggle: true
                }
            ]
        },
        {
            id: 'appearance',
            label: 'Apparence',
            icon: Layout,
            description: 'Personnalisez l\'interface',
            settings: [
                {
                    id: 'theme',
                    label: 'Thème',
                    description: 'Changer le thème de l\'application',
                    icon: Moon,
                    toggle: true,
                    action: toggleDarkMode,
                    value: isDarkMode
                }
            ]
        },
        {
            id: 'typography',
            label: 'Texte et Police',
            icon: Type,
            description: 'Personnalisez l\'affichage du texte',
            settings: [
                {
                    id: 'font-size',
                    label: 'Taille du texte',
                    description: 'Ajuster la taille globale du texte',
                    icon: Type
                }
            ]
        },
        {
            id: 'language',
            label: 'Langue',
            icon: Languages,
            description: 'Changez la langue de l\'application',
            settings: [
                {
                    id: 'app-language',
                    label: 'Langue de l\'application',
                    description: 'Changer la langue de l\'interface',
                    icon: Languages
                }
            ]
        },
        {
            id: 'help',
            label: 'Aide',
            icon: HelpCircle,
            description: 'Obtenez de l\'aide',
            settings: [
                {
                    id: 'support',
                    label: 'Support',
                    description: 'Contacter le support',
                    icon: Mail
                },
                {
                    id: 'about',
                    label: 'À propos',
                    description: 'Informations sur l\'application',
                    icon: Info
                }
            ]
        }
    ];

    const SettingsSkeleton = () => (
        <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-300/20 rounded-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="h-32 bg-gray-300/20 rounded-xl"></div>
                ))}
            </div>
        </div>
    );

    const SettingItem = ({ setting }) => (
        <div className={`p-3 rounded-lg transition-all duration-300 // Réduit le padding
            ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"> {/* Réduit le gap */}
                    <div className={`p-1.5 rounded-lg ${isDarkMode ? 'bg-[#2A3A53]' : 'bg-gray-100'}`}>
                        <setting.icon className={`w-4 h-4 ${isDarkMode ? 'text-[#FFAA00]' : 'text-[#2A3A53]'}`} />
                    </div>
                    <div>
                        <h3 className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                            {setting.label}
                        </h3>
                        <p className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {setting.description}
                        </p>
                    </div>
                </div>
                {setting.toggle ? (
                    <button
                        onClick={setting.action}
                        className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors
                            ${setting.value ? 'bg-[#FFAA00]' : isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}
                    >
                        <span className={`inline-block h-3 w-3 transform rounded-full bg-white shadow-md transition-transform
                            ${setting.value ? 'translate-x-4' : 'translate-x-1'}`}
                        />
                    </button>
                ) : (
                    <ChevronRight className={`w-3 h-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                )}
            </div>
        </div>
    );
    
    return (
        <div className={`w-full px-10 py-4 `}>
            <div className="max-w-[1920px] mx-auto"> {/* Augmente la largeur maximale */}
                <div className={`flex items-center gap-2 mb-3`}> {/* Réduit les marges */}
                    <Settings className={`w-5 h-5 ${isDarkMode ? 'text-[#FFAA00]' : 'text-[#2A3A53]'}`} />
                    <h1 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                        Paramètres
                    </h1>
                </div>
    
                <div className="flex flex-wrap gap-1.5 mb-4"> {/* Réduit les gaps */}
                    {settingsSections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all
                                ${activeSection === section.id 
                                    ? isDarkMode 
                                        ? 'bg-[#FFAA00] text-black' 
                                        : 'bg-[#2A3A53] text-white'
                                    : isDarkMode
                                        ? 'text-gray-300 hover:bg-white/5'
                                        : 'text-gray-600 hover:bg-black/5'
                                }`}
                        >
                            {section.label}
                        </button>
                    ))}
                </div>
    
                <div className={`rounded-lg p-4 ${isDarkMode ? 'bg-[#222f44]' : 'bg-white'}`}>
                    {loading ? (
                        <SettingsSkeleton />
                    ) : (
                        settingsSections.map((section) => (
                            section.id === activeSection && (
                                <div key={section.id} className="space-y-4">
                                    <div className="mb-4">
                                        <h2 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                                            {section.label}
                                        </h2>
                                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                            {section.description}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                        {section.settings.map((setting) => (
                                            <SettingItem key={setting.id} setting={setting} />
                                        ))}
                                    </div>
                                </div>
                            )
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ParametresList;