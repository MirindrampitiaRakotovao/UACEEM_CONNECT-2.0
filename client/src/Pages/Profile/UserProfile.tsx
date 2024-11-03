import Header from '../../components/Acceuil/AcceuilAdmin/Header/Header'
import Sidebar from '../../components/Acceuil/AcceuilAdmin/Sidebar/Sidebar'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import ProfilePosts from '../../components/Profile/ProfilePosts'
import { useTheme } from '../../context/ThemeContext'
import { motion } from 'framer-motion'
const UserProfile = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sidebar avec animation */}
      <motion.div 
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 fixed left-0 top-0 h-full shadow-lg z-30"
      >
        <Sidebar />
      </motion.div>
      {/* Contenu principal */}
      <div className="flex-1 ml-64">
        {/* Header fixe */}
        <div className="fixed top-0 right-0 left-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-20 h-16">
          <div className="h-full px-6">
            <Header />
          </div>
        </div>
        {/* Contenu scrollable */}
        <main className="pt-16">
          {/* Section Profile Header avec animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProfileHeader />
          </motion.div>
          {/* Section Posts avec animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
          >
            <div className="rounded-lg shadow-sm">
              <ProfilePosts />
            </div>
          </motion.div>
          {/* Footer optionnel */}
          <footer className="mt-auto py-6 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© 2024 Votre Plateforme. Tous droits réservés.</p>
          </footer>
        </main>
      </div>
    </div>
  )
}
export default UserProfile